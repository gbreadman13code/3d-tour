import { LocationGroup, VariantConfig, SceneConfig } from '../data/tour-config';

export interface VariantSelectorOptions {
  container: HTMLElement;
  onSceneSelect: (scene: SceneConfig, allScenes: SceneConfig[], variant?: VariantConfig) => void;
  onClose?: () => void;
}

export class VariantSelector {
  private container: HTMLElement;
  private onSceneSelect: (scene: SceneConfig, allScenes: SceneConfig[], variant?: VariantConfig) => void;
  private onClose?: () => void;
  private currentGroup: LocationGroup | null = null;
  private currentVariant: VariantConfig | null = null;
  private variantButton: HTMLElement | null = null;
  private modalOverlay: HTMLElement | null = null;

  constructor(options: VariantSelectorOptions) {
    this.container = options.container;
    this.onSceneSelect = options.onSceneSelect;
    this.onClose = options.onClose;
    this.init();
  }

  private init() {
    // Create button (initially hidden)
    this.variantButton = document.createElement('button');
    this.variantButton.className = 'variant-button hidden';
    this.variantButton.innerHTML = `
      <span class="variant-name"></span>
      <span class="variant-icon">
        <img src="assets/icons/dots-menu.svg" alt="Variant Icon" />
      </span>
    `;
    this.variantButton.addEventListener('click', () => this.openVariantModal());
    this.container.appendChild(this.variantButton);

    // Create modal overlay
    this.modalOverlay = document.createElement('div');
    this.modalOverlay.className = 'variant-modal hidden';
    this.modalOverlay.innerHTML = `
      <div class="variant-modal-content">
        <button class="variant-modal-close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
        <div class="variant-modal-header">
          <button class="variant-back-btn hidden">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <h2 class="variant-modal-title"></h2>
        </div>
        <div class="variant-grid"></div>
      </div>
    `;
    
    this.modalOverlay.querySelector('.variant-modal-close')?.addEventListener('click', () => this.closeModal());
    this.modalOverlay.querySelector('.variant-back-btn')?.addEventListener('click', () => this.openVariantModal());
    
    this.container.appendChild(this.modalOverlay);
  }

  public setLocationGroup(group: LocationGroup) {
    this.currentGroup = group;
    
    if (group.variants && group.variants.length > 0) {
      // Set default variant if not set
      const defaultVariantId = group.defaultVariantId || group.variants[0].id;
      const variant = group.variants.find(v => v.id === defaultVariantId) || group.variants[0];
      this.setVariant(variant);
      this.variantButton?.classList.remove('hidden');
    } else {
      this.currentVariant = null;
      this.variantButton?.classList.add('hidden');
    }
  }

  private setVariant(variant: VariantConfig) {
    this.currentVariant = variant;
    if (this.variantButton) {
      const nameSpan = this.variantButton.querySelector('.variant-name');
      if (nameSpan) nameSpan.textContent = variant.name;
    }
  }

  public openVariantModal() {
    if (!this.currentGroup || !this.currentGroup.variants || !this.modalOverlay) return;

    const title = this.modalOverlay.querySelector('.variant-modal-title');
    const backBtn = this.modalOverlay.querySelector('.variant-back-btn');
    const grid = this.modalOverlay.querySelector('.variant-grid');
    
    if (title) title.textContent = 'ВИДЫ НОМЕРОВ'; // Or generic title
    if (backBtn) backBtn.classList.add('hidden');
    if (grid) {
      grid.innerHTML = '';
      grid.className = 'variant-grid variants-mode'; // Add class for styling
      
      this.currentGroup.variants.forEach(variant => {
        const card = document.createElement('div');
        card.className = `variant-card ${this.currentVariant?.id === variant.id ? 'selected' : ''}`;
        card.innerHTML = `
          <div class="variant-card-image">
            <img src="${variant.thumbnail}" alt="${variant.name}" loading="lazy" decoding="async" />
          </div>
          <div class="variant-card-title">${variant.name}</div>
        `;
        card.addEventListener('click', () => {
          this.setVariant(variant);
          // Immediately select the first scene of the variant
          const firstScene = variant.scenes[0];
          if (firstScene) {
            this.onSceneSelect(firstScene, variant.scenes, variant);
            this.closeModal();
          }
        });
        grid.appendChild(card);
      });
    }

    this.modalOverlay.classList.remove('hidden');
  }

  private closeModal() {
    this.modalOverlay?.classList.add('hidden');
    if (this.onClose) {
      this.onClose();
    }
  }
}
