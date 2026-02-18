# Discovery Cards Feature Proposal

## Overview
Add a "Discovery" system where visitors can unlock new tarot cards by exploring, solving puzzles, or completing challenges. Each discovery earns them a new permanent card — a rewarding and playful way to build your deck.

## Core Functionality

1. **Locked Card Slots**
   - Show empty slots in the main deck where new cards will be added
   - Icon on each empty slot shows padlock 🔒
   - Visual cue: Cards appear "locked" and faded until discovered

2. **Discovery Quest**
   - Click any locked card slot → Opens a "Discovery Challenge"
   - Quests are fun mini-puzzles or challenges
   - Complete quest → Card unlocks and becomes part of main deck!

3. **Discovery Types**
   - **Code Breaker** — Find hidden code or pattern (puzzle)
   - **Mystery Unravel** — Click to reveal hidden messages on cards
   - **Skill Test** — Interactive challenge (match cards by color, memory game)
   - **Creative Challenge** — Upload a photo related to a project
   - **Trivia** — Answer questions about your work/projects

4. **Discovery Progress Tracker**
   - Track how many cards discovered (badge: "0/15")
   - Achievements unlocked as you discover more

5. **Card State Transitions**
   - Locked → Discovered: Card brightens, glow effect, "hatch" animation
   - Discovered cards show slight transparency/shimmer (they've been in the wild)

## Visual Design

### Discovery Challenge Window
```html
<div class="window" id="discovery-challenge" data-title="Discovery Quest">
  <div class="title-bar">
    <div class="title">Discovery Quest</div>
    <div class="controls"><button data-close>x</button></div>
  </div>
  <div class="window-content">
    <div class="challenge-content">
      <h2>🔒 Locked Card Discovered!</h2>
      <p>Congratulations! You've unlocked a new tarot card:</p>
      <div class="discovered-card">
        <!-- Card goes here -->
      </div>
      <div class="quest-complete">
        <p><strong>Quest Completed:</strong></p>
        <p><strong>Reward:</strong></p>
      </div>
    </div>
  </div>
</div>
```

### Main Deck - Locked Slots
```html
<!-- Empty slot showing lock icon -->
<div class="tarot-card locked-slot" data-slot="new1">
  <div class="lock-icon">🔒</div>
  <div class="slot-label">Unlock a Discovery Card...</div>
</div>
```

### Discovery Menu (Right-click on locked cards)
```html
<div class="context-menu">
  <div class="menu-item" data-action="start-quest">
    <img src="assets/images/icons/quest.png">
    <span>Start Discovery Quest</span>
  </div>
  <div class="menu-item" data-action="hint">
    <img src="assets/images/icons/hint.png">
    <span>Show Hint</span>
  </div>
</div>
```

### CSS Animations
```css
/* Discovery System */
.locked-slot {
  position: relative;
  cursor: pointer;
}

.lock-icon {
  font-size: 32px;
  opacity: 0.7;
}

.slot-label {
  font-size: 11px;
  color: #808080;
}

/* Card Discovery Animation */
@keyframes cardUnlock {
  0% {
    filter: brightness(0.7) grayscale(100%);
    transform: scale(0.8);
  }
  50% {
    filter: brightness(1);
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.4);
  }
  100% {
    filter: brightness(1);
    transform: scale(1);
    box-shadow: 0 0 20px 40px rgba(255, 215, 0, 0.6);
  }
}

.discovered-card .tarot-card-inner {
  animation: cardUnlock 0.6s ease-out;
}

/* Quest Window */
.discovery-challenge {
  background: linear-gradient(135deg, #4a3a52, #2d1b4e, #1f1a35);
  border: 3px solid #d4af37;
  padding: 24px;
}

.challenge-content h2 {
  color: #ffffff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}
```

### JavaScript Implementation
```javascript
// Discovery Card System
const discoverySystem = {
  discoveredCards: [],
  quests: [
    {
      type: 'code-breaker',
      title: 'Code Breaker',
      description: 'Find the hidden pattern to unlock this card',
      challenge: 'Solve a series of puzzles related to card theme'
    },
    {
      type: 'mystery-unravel',
      title: 'Mystery Unravel',
      description: 'Decode the secret message hidden on this card',
      challenge: 'Interact with card to reveal hidden layers'
    },
    {
      type: 'skill-test',
      title: 'Skill Test',
      description: 'Match cards by color to test your memory',
      challenge: 'Quick reaction game'
    },
    {
      type: 'creative',
      title: 'Creative Upload',
      description: 'Share a photo that inspired this card',
      challenge: 'Express yourself through imagery'
    },
    {
      type: 'trivia',
      title: 'Project Trivia',
      description: 'Answer questions about Hannah Estes projects',
      challenge: 'Test your knowledge!'
    }
  ],

  startQuest: function(slotId, questType) {
    const quest = this.quests[questType];
    
    // Open discovery challenge window
    document.getElementById('discovery-challenge').style.display = 'flex';
    document.getElementById('discovery-challenge').dataset.quest = questType;
    
    // Show quest details
    document.querySelector('.quest-complete').innerHTML = `
      <p><strong>Quest Completed:</strong> ${quest.description}</p>
      <p><strong>Reward:</strong> ${quest.title}</p>
    `;

    // Generate card data
    const cardData = {
      id: `discovered-${Date.now()}`,
      title: this.generateCardTitle(questType),
      image: `assets/images/tarot/discovered-${questType}.png`,
      description: `You discovered a ${quest.title.toLowerCase()} card through exploration and curiosity! This card represents the ${quest.type} in you — the drive to discover, create, and connect with the world around you.`,
      type: questType,
      discoveredAt: new Date().toLocaleDateString()
      viewCount: 0
    };

    // Add to deck
    const cardElement = this.querySelector(`[data-slot="${slotId}"]`);
    cardElement.innerHTML = `
      <div class="tarot-card-inner">
        <div class="tarot-card-front">
          <img src="${cardData.image}" alt="${cardData.title}">
        </div>
        <div class="tarot-card-back">
          <h4>${cardData.title}</h4>
          <p>${cardData.description}</p>
        </div>
      </div>
    `;
    
    // Add to discovered cards array
    this.discoveredCards.push(cardData);
    saveDiscoveredCards();
    
    // Play discovery sound
    playSound('discover');
  },

  generateCardTitle: function(type) {
    const titles = {
      'code-breaker': 'The Cryptic Coder',
      'mystery-unravel': 'The Hidden Whisper',
      'skill-test': 'The Memory Architect',
      'creative': 'The Visionary Dreamer',
      'trivia': 'The Knowledge Keeper'
    };
    return titles[type];
  },

  saveDiscoveredCards: function() {
    localStorage.setItem('discoveredCards', JSON.stringify(this.discoveredCards));
  },

  loadDiscoveredCards: function() {
    const saved = localStorage.getItem('discoveredCards');
    if (saved) {
      this.discoveredCards = JSON.parse(saved);
    }
  }
};

// Initialize on page load
window.addEventListener('DOMContentLoaded', function() {
  discoverySystem.loadDiscoveredCards();
});
```

## User Stories

**Story 1: The Explorer**
Visitor clicks a locked card slot and starts a "Code Breaker" quest. They solve puzzles related to the "XR Developer" card theme — patterns, codes, technical challenges. Each correct answer unlocks a fragment of the hidden message on the card back. By the time they complete the quest, the "Cryptic Coder" card is revealed — a visually striking card showing advanced code patterns and glitch effects, representing your technical depth and problem-solving skills.

**Story 2: The Curious Creator**
Another visitor discovers your "Mobile Developer" card through a "Creative Upload" quest. They upload a photo of a stunning glass piece they created, capturing the artistry and craftsmanship. The "Visionary Dreamer" card is revealed — a beautiful card with dreamlike imagery representing your passion for AR/VR and spatial experiences.

**Story 3: The Archaeologist**
You return to your portfolio months later and discover several new cards waiting in the discovery system. Each one tells a story about different creative phases — "The Student" card showing your academic journey, "The Professional" card capturing your enterprise experience, and even special discovery cards about your love for glass fusing. You realize these cards have been waiting there — hidden gems about your creative life just waiting to be rediscovered and appreciated.

## Benefits

1. **Gamification Without Competition** — Discovery is personal journey, not competitive
2. **Storytelling** — Each discovered card adds narrative depth to your portfolio
3. **Replay Value** — Discovery quests can be replayed, adding content value
4. **Visitor Engagement** — Interactive challenges encourage deeper exploration
5. **Scalable Content** — Easy to add new discovery quests without coding

## Future Enhancements

- **Discovery Paths** — Multiple ways to unlock same card (different quests converge)
- **Combo Discoveries** — Complete multiple related quests for special cards
- **Daily Discovery** — One new discovery per day to encourage repeat visits
- **Social Sharing** — Share discovered cards on social media

---

**This feature turns your portfolio into an explorable world!** Visitors don't just read about you — they earn cards through curiosity and engagement. Each discovered card tells a story about a different aspect of your creativity — technical skills, artistic vision, knowledge, and personal passion.

Much more positive and rewarding than "discarded" cards! 🌟✨
