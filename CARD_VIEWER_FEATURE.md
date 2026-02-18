# Single Card Viewer Feature Proposal

## Overview
Add a card view mechanism to view discarded tarot cards individually. This allows visitors (and you) to examine any card that was "put away" — like the "About Me" cards — without needing to add them back to the main deck.

## Core Functionality

1. **Discard/Retire Cards to Card Vault**
   - Right-click any card → "Move to Card Vault" option
   - Cards move to a separate collection (can't be used in main deck)
   - Shows count of how many cards are in the vault

2. **Open Card from Card Vault**
   - Click Card Vault icon → Shows all vaulted cards in a grid
   - Click any vaulted card → Opens in single card viewer
   - "View Card" mode shows large version with card details

3. **Restore from Vault to Deck (Optional)**
   - In Card Vault, right-click → "Restore to Main Deck"
   - Card reappears on main deck with subtle glow effect
   - Useful if you want to bring back a retired card

## Visual Design

### Card Vault Icon
- Replace Recycle Bin with "Card Vault" icon
- Position: Bottom-right corner of desktop
- Shows badge with count of vaulted cards (like bin did)

### Card Viewer Window
**Layout:**
```
┌─────────────────────────────┐
│                            │
│    [Card Image Display]   │
│                            │
│    [Card Title]           │
│                            │
│    [Card Description]      │
│                            │
│    [Meaning]              │
│                            │
│    [Card Stats]            │
│                            │
│                            │
└─────────────────────────────┘
```

### Card States
- **Vaulted Card**: Shows lock icon in corner, slightly desaturated
- **Active Card**: Full color, no modifications

### Navigation
- **Previous/Next buttons**: Browse through vaulted cards
- **Close button**: Return to main deck view
- **"Add to Main Deck" button**: Optional, appears in vault view

## User Stories

**Story 1: The "Retired" Professional Card**
You have a "Lead Developer" card from a previous job. You're now focusing on new technologies, so you move it to the Card Vault instead of deleting it forever. Later, you can browse your vault and recall that old experience whenever you want a nostalgic trip down memory lane.

**Story 2: Exploring Alternative Paths**
A visitor clicks your "Software Developer" card and flips it over. On the back, they see your "Mobile Developer" career. They read through all the details, close the viewer, then click back to your "XR Developer" card to compare paths. The card viewer becomes a tool for visitors to explore your professional journey from multiple angles.

**Story 3: The "Concept Card" Discovery**
Someone opens your "XR Developer" card and finds it's actually about your early career in Unity and mobile development. They're curious and want to see if there are more cards about that era. They use the Card Vault to search through all your vaulted cards and discover hidden gems about your creative history.

## Technical Implementation

### HTML Updates

```html
<!-- Replace Recycle Bin with Card Vault -->
<div class="icon" id="card-vault" data-icon="card-vault">
  <img src="assets/images/icons/card-vault.png" alt="Card Vault">
  <span class="vault-count" id="vault-count">0</span>
</div>

<!-- Card Vault Window -->
<div class="window" id="card-vault-window" data-title="Card Vault">
  <div class="title-bar">
    <div class="title">Card Vault</div>
    <div class="controls"><button data-close>x</button></div>
  </div>
  <div class="window-content">
    <div class="vault-grid" id="vault-grid">
      <!-- Vaulted cards appear here -->
    </div>
    
    <div class="card-viewer" id="card-viewer" style="display:none;">
      <div class="viewer-layout">
        <div class="viewer-image">
          <img id="viewer-card-image" src="" alt="Card">
        </div>
        <div class="viewer-details">
          <h4 id="viewer-card-title">Card Title</h4>
          <p id="viewer-card-desc">Card description...</p>
          <div class="viewer-meta">
            <p><strong>Meaning:</strong> <span id="viewer-meaning">Card meaning...</span></p>
            <p><strong>Card Type:</strong> <span id="viewer-type">The Seeker / The Professional...</span></p>
          </div>
          <div class="viewer-stats">
            <p><strong>Date Added:</strong> <span id="viewer-date">-</span></p>
            <p><strong>Times Viewed:</strong> <span id="viewer-views">-</span></p>
          </div>
          <button class="restore-btn" id="restore-to-deck">Add to Main Deck</button>
        </div>
      </div>
    </div>
  </div>
</div>
```

### CSS Updates

```css
/* Card Vault Icon */
#card-vault {
  position: absolute;
  bottom: 100px;
  right: 20px;
  z-index: 100;
}

#card-vault img {
  width: 48px;
  height: 48px;
}

.vault-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #c0c0c0;
  color: #ffffff;
  border-radius: 50%;
  padding: 0 4px;
  font-size: 10px;
  font-weight: bold;
  min-width: 16px;
  text-align: center;
}

/* Card Vault Window */
#card-vault-window {
  width: 800px;
  height: 600px;
  margin: 0 auto;
  position: relative;
}

.vault-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
  padding: 16px;
  max-height: 400px;
  overflow-y: auto;
}

.vaulted-card {
  position: relative;
  cursor: pointer;
}

.vaulted-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
}

.vaulted-card:hover .card-name {
  text-decoration: underline;
}

.card-vault-icon {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 16px;
  height: 16px;
  opacity: 0.5;
}

/* Single Card Viewer */
.card-viewer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: opacity 0.3s ease-in-out;
}

.card-viewer.hidden {
  opacity: 0;
  pointer-events: none;
}

.viewer-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 90%;
}

.viewer-image {
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.viewer-image img {
  max-width: 280px;
  max-height: 400px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  border-radius: 8px;
  background: #ffffff;
  padding: 4px;
}

.viewer-details {
  flex: 1;
  max-width: 400px;
  text-align: center;
}

.viewer-details h4 {
  margin: 0 0 8px 0;
  color: #1f1a35;
  font-size: 18px;
}

.viewer-details p {
  margin: 0 0 4px 12px 0;
  line-height: 1.5;
  color: #5a4a6e;
}

.viewer-meta {
  margin-top: 12px;
  padding: 12px;
  background: rgba(230,220,245,0.15);
  border-radius: 4px;
}

.viewer-meta strong {
  color: #1f1a35;
}

.viewer-meta span {
  color: #5a4a6e;
}

.viewer-stats {
  margin-top: 8px;
  padding: 8px;
  border-top: 1px solid #7a6890;
}

.viewer-stats p {
  margin: 0;
  font-size: 12px;
}

.viewer-stats strong {
  color: #7a6890;
}

.restore-btn {
  padding: 8px 16px;
  background: var(--accent-purple);
  color: #ffffff;
  border: 2px solid var(--border-dark);
  box-shadow: inset 1px 1px var(--border-light), inset -1px -1px var(--border-mid);
  cursor: pointer;
  font-size: 12px;
  border-radius: 4px;
  margin-top: 16px;
}

.restore-btn:hover {
  background: #7a6890;
}

/* Responsive */
@media (max-width: 600px) {
  #card-vault-window {
    width: 90%;
    height: auto;
    max-height: 80vh;
  }

  .vault-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }

  .viewer-layout {
    flex-direction: column;
  }
}
```

### JavaScript Implementation

```javascript
// Card Vault State Management
const cardVault = {
  vaultedCards: [],
  openCard: null,
  currentView: 'vault', // 'vault' or 'viewer'

  addToVault: function(cardData) {
    this.vaultedCards.push({
      id: cardData.id,
      title: cardData.title,
      image: cardData.image,
      description: cardData.description,
      meaning: cardData.meaning,
      type: cardData.type,
      dateAdded: new Date(),
      viewCount: 0
    });
    updateVaultCount();
    saveVault();
  },

  removeFromVault: function(cardId) {
    const index = this.vaultedCards.findIndex(c => c.id === cardId);
    if (index > -1) {
      this.vaultedCards.splice(index, 1);
      updateVaultCount();
      saveVault();
    }
  },

  restoreToDeck: function(cardId) {
    const card = this.vaultedCards.find(c => c.id === cardId);
    if (card) {
      const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
      if (cardElement) {
        cardElement.classList.remove('vaulted');
        cardElement.style.opacity = '';
        cardElement.style.filter = '';
        cardElement.classList.remove('card-vault-icon');
        playSound('recover');
      }
    }
  },

  openViewer: function(cardData) {
    this.currentView = 'viewer';
    this.openCard = cardData.id;
    
    // Hide vault grid, show viewer
    document.getElementById('vault-grid').style.display = 'none';
    document.getElementById('card-viewer').style.display = 'flex';
    document.getElementById('card-viewer').classList.remove('hidden');
    
    // Populate viewer
    document.getElementById('viewer-card-image').src = cardData.image;
    document.getElementById('viewer-card-title').textContent = cardData.title;
    document.getElementById('viewer-card-desc').textContent = cardData.description || '';
    document.getElementById('viewer-meaning').textContent = cardData.meaning || '';
    document.getElementById('viewer-type').textContent = cardData.type || '';
    document.getElementById('viewer-date').textContent = cardData.dateAdded ? cardData.dateAdded.toLocaleDateString() : '-';
    document.getElementById('viewer-views').textContent = cardData.viewCount ? cardData.viewCount : 0;
    
    // Increment view count
    cardData.viewCount = (cardData.viewCount || 0) + 1;
    
    updateVaultCount();
    playSound('card-flip');
  },

  closeViewer: function() {
    this.currentView = 'vault';
    this.openCard = null;
    
    // Hide viewer, show vault grid
    document.getElementById('vault-grid').style.display = 'grid';
    document.getElementById('card-viewer').classList.add('hidden');
    document.getElementById('card-viewer').style.display = 'none';
    playSound('window-close');
  },

  restoreToDeckButton: function(cardId) {
    const restoreBtn = document.getElementById('restore-to-deck');
    if (restoreBtn) {
      restoreBtn.onclick = () => {
        cardVault.restoreToDeck(cardId);
        closeViewer();
        playSound('success');
      };
    }
  },

  updateVaultCount: function() {
    const countElement = document.getElementById('vault-count');
    countElement.textContent = this.vaultedCards.length;
  },

  saveVault: function() {
    localStorage.setItem('cardVault', JSON.stringify(this.vaultedCards));
  },

  loadVault: function() {
    const saved = localStorage.getItem('cardVault');
    if (saved) {
      this.vaultedCards = JSON.parse(saved);
      updateVaultCount();
      
      // Render vaulted cards
      const vaultGrid = document.getElementById('vault-grid');
      vaultGrid.innerHTML = '';
      
      this.vaultedCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'vaulted-card';
        cardElement.dataset.cardId = card.id;
        cardElement.innerHTML = `
          <div class="card-vault-icon">🔒</div>
          <img src="${card.image}" alt="${card.title}">
          <div class="card-name">${card.title}</div>
        `;
        
        cardElement.addEventListener('click', () => {
          cardVault.openViewer(card);
        });
        
        vaultGrid.appendChild(cardElement);
      });
    }
  }
};

// Add Card Vault to desktop
const vaultIcon = document.createElement('div');
vaultIcon.className = 'icon';
vaultIcon.id = 'card-vault';
vaultIcon.innerHTML = `
  <img src="assets/images/icons/card-vault.png" alt="Card Vault">
  <span class="vault-count" id="vault-count">0</span>
`;
document.getElementById('desktop').appendChild(vaultIcon);

// Add Card Vault window
const vaultWindow = document.createElement('div');
vaultWindow.className = 'window';
vaultWindow.id = 'card-vault-window';
vaultWindow.innerHTML = `
  <div class="title-bar">
    <div class="title">Card Vault</div>
    <div class="controls"><button data-close>x</button></div>
  </div>
  <div class="window-content">
    <div class="vault-grid" id="vault-grid">
      <!-- Vaulted cards rendered here -->
    </div>
    <div class="card-viewer" id="card-viewer" style="display:none;">
      <div class="viewer-layout">
        <div class="viewer-image">
          <img id="viewer-card-image" src="" alt="Card">
        </div>
        <div class="viewer-details">
          <h4 id="viewer-card-title">Card Title</h4>
          <p id="viewer-card-desc">Card description...</p>
          <div class="viewer-meta">
            <p><strong>Meaning:</strong> <span id="viewer-meaning">Card meaning...</span></p>
            <p><strong>Card Type:</strong> <span id="viewer-type">The Seeker / The Professional...</span></p>
          </div>
          <div class="viewer-stats">
            <p><strong>Date Added:</strong> <span id="viewer-date">-</span></p>
            <p><strong>Times Viewed:</strong> <span id="viewer-views">-</span></p>
          </div>
          <button class="restore-btn" id="restore-to-deck">Add to Main Deck</button>
        </div>
      </div>
    </div>
  </div>
`;
document.getElementById('desktop').appendChild(vaultWindow);

// Right-click context menu for cards
document.querySelectorAll('.tarot-card').forEach(card => {
  card.addEventListener('contextmenu', function(e) {
    e.preventDefault();

    const cardId = card.dataset.id;
    const isVaulted = card.classList.contains('vaulted');

    const menu = document.createElement('div');
    menu.className = 'context-menu';
    menu.innerHTML = `
      <div class="menu-item" data-action="${isVaulted ? 'unvault' : 'vault'}">
        <img src="assets/images/icons/${isVaulted ? 'unvault' : 'vault'}.png">
        <span>${isVaulted ? 'Move to Main Deck' : 'Move to Card Vault'}</span>
      </div>
      ${!isVaulted ? `
      <div class="menu-item" data-action="open-vaulted">
        <img src="assets/images/icons/view-card.png">
        <span>Open Card Vault</span>
      </div>
      ` : ''}
    `;

    menu.style.position = 'absolute';
    menu.style.left = `${e.pageX}px`;
    menu.style.top = `${e.pageY}px`;
    menu.style.zIndex = '10000';

    document.body.appendChild(menu);

    // Handle menu clicks
    menu.addEventListener('click', function(e) {
      if (e.target.closest('[data-action="vault"]')) {
        cardVault.addToVault({
          id: cardId,
          title: card.dataset.title,
          image: card.querySelector('img').src,
          description: card.querySelector('.card-name').textContent,
          meaning: card.querySelector('.card-name').textContent,
          type: 'The Seeker / The Professional'
        });
        applyVaultedState(card);
        closeContextMenu();
      } else if (e.target.closest('[data-action="unvault"]')) {
        cardVault.restoreToDeck(cardId);
        closeContextMenu();
      } else if (e.target.closest('[data-action="open-vaulted"]')) {
        cardVault.openViewer({
          id: cardId,
          title: card.dataset.title,
          image: card.querySelector('img').src,
          description: card.querySelector('.card-name').textContent,
          meaning: card.querySelector('.card-name').textContent,
          type: 'The Seeker / The Professional'
        });
        closeContextMenu();
      }

      document.body.removeChild(menu);
    });

    // Close menu when clicking elsewhere
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.context-menu')) {
        closeContextMenu();
      }
    });
});

function closeContextMenu() {
  document.querySelectorAll('.context-menu').forEach(m => m.remove());
}

function applyVaultedState(card) {
  const inner = card.querySelector('.tarot-card-inner');
  inner.style.transition = 'all 0.3s ease-out';
  inner.style.transform = 'scale(0.8)';
  inner.style.filter = 'brightness(1.2)';
  
  setTimeout(() => {
    inner.style.transform = 'scale(0)';
    inner.style.filter = 'grayscale(100%)';
    inner.style.opacity = '0.6';
  }, 300);

  // Add vault icon
  const vaultIcon = document.createElement('div');
  vaultIcon.className = 'card-vault-icon';
  vaultIcon.innerHTML = '🔒';
  card.querySelector('.tarot-card-front').appendChild(vaultIcon);
}

function applyUnvaultedState(card) {
  const inner = card.querySelector('.tarot-card-inner');
  inner.style.filter = '';
  inner.style.opacity = '';
  inner.style.transform = '';
  
  // Remove vault icon
  const vaultIcon = card.querySelector('.card-vault-icon');
  if (vaultIcon) {
    vaultIcon.remove();
  }
}

// Load vault on page load
window.addEventListener('DOMContentLoaded', function() {
  cardVault.loadVault();
});
```

## Assets Needed

- Card Vault Icon (48x48px)
- Lock icon (vaulted state indicator)
- Vault icon (unvaulted state indicator)
- View card icon
- Menu icons (vault, unvault, open-vaulted)
- Sound effects (optional):
  - card-flip.mp3
  - window-close.mp3
  - success.mp3

## Integration with Existing Features

This feature integrates seamlessly with your Windows 98 desktop:
- Replaces Recycle Bin with Card Vault icon (different purpose)
- Uses same window system as other desktop elements
- Right-click menus add vault management to existing cards
- Vault state persists in localStorage
- Viewer overlays existing desktop (z-index 2)

## Benefits

1. **Archive without Deleting** - Keep old cards for nostalgia without cluttering main deck
2. **Privacy** - Visitors can view vaulted cards, but can't accidentally use them
3. **Storytelling** - Shows your creative evolution over time (different cards for different eras)
4. **Flexibility** - Move cards between deck and vault as needed
5. **Memorable** - View count shows how often you've revisited cards

## Implementation Notes

- The vault uses localStorage to persist vaulted cards
- Cards can be individually restored to the main deck
- Viewer shows full card details including view count history
- Clean separation between "active deck" and "archived vault"

## Future Enhancements (Optional)

- Animated vault icon that "glows" when cards are added
- "Most Viewed" sorting in vault view
- Search/filter within vault
- Export vault as JSON
- Multiple vaults (themed collections: "Old Work", "Concept Art", "Personal Favorites")

---

**This feature gives you a nostalgic "card vault" where visitors can discover your creative history — perfect for showing off your evolution and exploring different aspects of your personality!**
