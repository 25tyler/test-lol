/**
 * League of Legends Quests Interface
 * Using Anime.js for smooth animations and interactions
 */

class QuestsInterface {
    constructor() {
        this.currentCategory = 'daily';
        this.quests = this.initializeQuests();
        this.animations = {};
        this.init();
    }

    /**
     * Initialize the quest interface
     */
    init() {
        this.setupEventListeners();
        this.animateInitialLoad();
        this.updateProgressBars();
    }

    /**
     * Set up all event listeners
     */
    setupEventListeners() {
        // Category buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Get the category from the button element, not the target (which might be a child element)
                const category = e.currentTarget.dataset.category;
                this.switchCategory(category);
            });
        });

        // Claim buttons
        document.querySelectorAll('.claim-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.claimQuest(e));
        });

        // Quest item hover effects
        document.querySelectorAll('.quest-item').forEach(item => {
            item.addEventListener('mouseenter', (e) => this.animateQuestHover(e.target, true));
            item.addEventListener('mouseleave', (e) => this.animateQuestHover(e.target, false));
        });
    }

    /**
     * Initialize quest data
     */
    initializeQuests() {
        return {
            daily: [
                {
                    id: 'win-games',
                    title: 'Victory Seeker',
                    description: 'Win 3 games in any game mode',
                    progress: { current: 2, total: 3 },
                    reward: { type: 'blue-essence', amount: 500 },
                    completed: false,
                    claimable: false
                },
                {
                    id: 'play-champions',
                    title: 'Champion Explorer',
                    description: 'Play 5 different champions',
                    progress: { current: 5, total: 5 },
                    reward: { type: 'blue-essence', amount: 1000 },
                    completed: false,
                    claimable: true
                },
                {
                    id: 'kill-minions',
                    title: 'Minion Slayer',
                    description: 'Kill 100 minions',
                    progress: { current: 67, total: 100 },
                    reward: { type: 'blue-essence', amount: 300 },
                    completed: false,
                    claimable: false
                }
            ],
            weekly: [
                {
                    id: 'weekly-wins',
                    title: 'Weekly Champion',
                    description: 'Win 10 games this week',
                    progress: { current: 7, total: 10 },
                    reward: { type: 'blue-essence', amount: 2000 },
                    completed: false,
                    claimable: false
                },
                {
                    id: 'weekly-time',
                    title: 'Time Warrior',
                    description: 'Play for 5 hours this week',
                    progress: { current: 5, total: 5 },
                    reward: { type: 'blue-essence', amount: 1500 },
                    completed: false,
                    claimable: true
                }
            ],
            event: [
                {
                    id: 'event-special',
                    title: 'Arcane Explorer',
                    description: 'Complete the Arcane event storyline',
                    progress: { current: 3, total: 5 },
                    reward: { type: 'skin', name: 'Special Arcane Skin' },
                    completed: false,
                    claimable: false
                }
            ]
        };
    }

    /**
     * Animate initial page load
     */
    animateInitialLoad() {
        // Animate header elements
        anime({
            targets: '.logo',
            translateY: [-50, 0],
            opacity: [0, 1],
            duration: 800,
            easing: 'easeOutElastic(1, .8)'
        });

        anime({
            targets: '.player-info',
            translateX: [50, 0],
            opacity: [0, 1],
            duration: 600,
            delay: 200,
            easing: 'easeOutQuart'
        });

        // Animate category buttons
        anime({
            targets: '.category-btn',
            translateY: [30, 0],
            opacity: [0, 1],
            duration: 500,
            delay: anime.stagger(100, {start: 400}),
            easing: 'easeOutQuart'
        });

        // Animate quest items
        anime({
            targets: '.quest-item',
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 600,
            delay: anime.stagger(150, {start: 800}),
            easing: 'easeOutQuart'
        });
    }

    /**
     * Switch between quest categories
     */
    switchCategory(category) {
        if (this.currentCategory === category) return;

        // Animate out current content
        const currentContent = document.querySelector('.quest-category-content.active');
        if (currentContent) {
            anime({
                targets: currentContent,
                translateX: [0, -100],
                opacity: [1, 0],
                duration: 300,
                easing: 'easeInQuart',
                complete: () => {
                    currentContent.classList.remove('active');
                    this.showCategoryContent(category);
                }
            });
        }

        // Update active category button
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`).classList.add('active');

        this.currentCategory = category;
    }

    /**
     * Show category content with animation
     */
    showCategoryContent(category) {
        const content = document.getElementById(`${category}-quests`);
        content.classList.add('active');
        
        // Reset quest items for animation
        const questItems = content.querySelectorAll('.quest-item');
        questItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(50px)';
        });

        // Animate in quest items
        anime({
            targets: questItems,
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 500,
            delay: anime.stagger(100),
            easing: 'easeOutQuart'
        });
    }

    /**
     * Animate quest item hover
     */
    animateQuestHover(element, isEntering) {
        if (isEntering) {
            anime({
                targets: element,
                scale: [1, 1.02],
                duration: 200,
                easing: 'easeOutQuart'
            });

            anime({
                targets: element.querySelector('.quest-icon'),
                rotate: [0, 10],
                scale: [1, 1.1],
                duration: 300,
                easing: 'easeOutElastic(1, .8)'
            });
        } else {
            anime({
                targets: element,
                scale: [1.02, 1],
                duration: 200,
                easing: 'easeOutQuart'
            });

            anime({
                targets: element.querySelector('.quest-icon'),
                rotate: [10, 0],
                scale: [1.1, 1],
                duration: 300,
                easing: 'easeOutElastic(1, .8)'
            });
        }
    }

    /**
     * Claim a quest
     */
    claimQuest(event) {
        const questItem = event.target.closest('.quest-item');
        const questId = questItem.dataset.quest;
        
        if (event.target.disabled || !event.target.classList.contains('claimable')) {
            this.animateError(event.target);
            return;
        }

        // Animate claim button
        this.animateClaimButton(event.target);
        
        // Mark quest as completed
        this.markQuestCompleted(questId);
        
        // Show notification
        this.showNotification('Quest completed!');
        
        // Update quest data
        this.updateQuestData(questId);
    }

    /**
     * Animate claim button
     */
    animateClaimButton(button) {
        // Scale animation
        anime({
            targets: button,
            scale: [1, 1.3, 1],
            duration: 400,
            easing: 'easeOutElastic(1, .8)'
        });

        // Color change
        anime({
            targets: button,
            backgroundColor: ['#00D4AA', '#00A085'],
            duration: 200,
            delay: 200
        });

        // Icon change
        const icon = button.querySelector('i');
        anime({
            targets: icon,
            rotate: [0, 360],
            duration: 500,
            easing: 'easeOutElastic(1, .8)'
        });
    }

    /**
     * Animate error state
     */
    animateError(button) {
        anime({
            targets: button,
            translateX: [-10, 10, -10, 10, 0],
            duration: 400,
            easing: 'easeInOutQuart'
        });

        anime({
            targets: button,
            backgroundColor: ['#1E2328', '#FF6B6B', '#1E2328'],
            duration: 600,
            easing: 'easeInOutQuart'
        });
    }

    /**
     * Mark quest as completed
     */
    markQuestCompleted(questId) {
        const questItem = document.querySelector(`[data-quest="${questId}"]`);
        questItem.classList.add('completed');
        
        // Animate completion
        anime({
            targets: questItem,
            backgroundColor: ['#1E2328', 'rgba(0, 212, 170, 0.1)'],
            borderColor: ['#463714', '#00D4AA'],
            duration: 500,
            easing: 'easeOutQuart'
        });

        // Animate icon
        const icon = questItem.querySelector('.quest-icon');
        anime({
            targets: icon,
            backgroundColor: ['#C9AA71', '#00D4AA'],
            color: ['#0F1419', 'white'],
            duration: 500,
            easing: 'easeOutQuart'
        });
    }

    /**
     * Show notification toast
     */
    showNotification(message) {
        const toast = document.getElementById('notification-toast');
        const messageElement = toast.querySelector('.toast-message');
        messageElement.textContent = message;
        
        toast.classList.add('show');
        
        // Animate in
        anime({
            targets: toast,
            translateX: [400, 0],
            duration: 400,
            easing: 'easeOutQuart'
        });

        // Auto hide after 3 seconds
        setTimeout(() => {
            anime({
                targets: toast,
                translateX: [0, 400],
                duration: 300,
                easing: 'easeInQuart',
                complete: () => {
                    toast.classList.remove('show');
                }
            });
        }, 3000);
    }

    /**
     * Update quest data
     */
    updateQuestData(questId) {
        // Find quest in data and mark as completed
        Object.keys(this.quests).forEach(category => {
            const quest = this.quests[category].find(q => q.id === questId);
            if (quest) {
                quest.completed = true;
                quest.claimable = false;
            }
        });
    }

    /**
     * Update progress bars with animation
     */
    updateProgressBars() {
        document.querySelectorAll('.progress-fill').forEach(fill => {
            const progressText = fill.dataset.progress;
            const [current, total] = progressText.split('/').map(Number);
            const percentage = (current / total) * 100;
            
            // Set initial width to 0
            fill.style.width = '0%';
            
            // Animate to actual progress
            anime({
                targets: fill,
                width: `${percentage}%`,
                duration: 1000,
                delay: 500,
                easing: 'easeOutQuart'
            });
        });
    }

    /**
     * Animate progress update
     */
    animateProgressUpdate(questId, newProgress) {
        const questItem = document.querySelector(`[data-quest="${questId}"]`);
        const progressFill = questItem.querySelector('.progress-fill');
        const progressText = questItem.querySelector('.progress-text');
        
        const [current, total] = progressText.textContent.split('/').map(Number);
        const newCurrent = Math.min(current + newProgress, total);
        const percentage = (newCurrent / total) * 100;
        
        // Update text
        progressText.textContent = `${newCurrent}/${total}`;
        
        // Animate progress bar
        anime({
            targets: progressFill,
            width: `${percentage}%`,
            duration: 800,
            easing: 'easeOutQuart'
        });

        // Check if quest is now claimable
        if (newCurrent >= total) {
            const claimBtn = questItem.querySelector('.claim-btn');
            claimBtn.classList.add('claimable');
            claimBtn.disabled = false;
            claimBtn.innerHTML = '<i class="fas fa-check"></i>';
            
            // Animate button change
            anime({
                targets: claimBtn,
                backgroundColor: ['#1E2328', '#00D4AA'],
                borderColor: ['#463714', '#00D4AA'],
                duration: 500,
                easing: 'easeOutQuart'
            });
        }
    }
}

// Initialize the quest interface when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const questsInterface = new QuestsInterface();
    
    // Add some demo functionality
    console.log('🎮 League of Legends Quests Interface Loaded!');
    console.log('✨ Features:');
    console.log('- Smooth Anime.js animations');
    console.log('- League of Legends aesthetic');
    console.log('- Interactive quest claiming');
    console.log('- Progress tracking');
    console.log('- Responsive design');
    
    // Demo: Simulate progress updates (for testing)
    setTimeout(() => {
        console.log('🎯 Demo: Simulating quest progress...');
        // You can uncomment these to test progress animations
        // questsInterface.animateProgressUpdate('win-games', 1);
        // questsInterface.animateProgressUpdate('kill-minions', 10);
    }, 2000);
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuestsInterface;
}
