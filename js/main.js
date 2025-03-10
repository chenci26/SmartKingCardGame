document.addEventListener('DOMContentLoaded', () => {
    const categoriesContainer = document.getElementById('categories');
    const modal = document.getElementById('answerModal');
    const confirmBtn = document.getElementById('confirmAnswer');
    const cancelBtn = document.getElementById('cancelAnswer');
    
    let currentCard = null;

    // Render all categories
    function renderCategories() {
        quizData.categories.forEach(category => {
            const categoryElement = document.createElement('div');
            categoryElement.className = 'category';
            
            const titleElement = document.createElement('h2');
            titleElement.className = 'category-title';
            titleElement.textContent = category.name;
            
            // Add click event to category title
            categoryElement.addEventListener('click', () => {
                // Remove existing cards if any
                const existingCards = categoryElement.querySelector('.cards');
                if (existingCards) {
                    existingCards.remove();
                    return;
                }

                // Create and add cards container
                const cardsContainer = document.createElement('div');
                cardsContainer.className = 'cards';
                
                category.questions.forEach(question => {
                    const card = createCard(question);
                    cardsContainer.appendChild(card);
                });
                
                categoryElement.appendChild(cardsContainer);
            });
            
            categoryElement.appendChild(titleElement);
            categoriesContainer.appendChild(categoryElement);
        });
    }

    // Create a single card
    function createCard(questionData) {
        const card = document.createElement('div');
        card.className = 'card';
        
        const cardInner = document.createElement('div');
        cardInner.className = 'card-inner';
        
        const cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        cardFront.innerHTML = `<span class="score">${questionData.points}</span>`;
        
        const cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        
        let isFlipped = false;
        let isAnswerShown = false;
        
        card.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent category click event from triggering
            if (isAnswerShown) return;
            
            if (!isFlipped) {
                // First click - show question
                cardBack.textContent = questionData.question;
                card.classList.add('flipped');
                isFlipped = true;
            } else {
                // Second click - show modal
                currentCard = {
                    element: cardBack,
                    data: questionData
                };
                modal.classList.add('active');
            }
        });
        
        return card;
    }

    // Modal event listeners
    confirmBtn.addEventListener('click', () => {
        if (currentCard) {
            currentCard.element.innerHTML = `
                <div class="answer-container">
                    <div class="answer-points">${currentCard.data.points}分</div>
                    <div class="answer-text">${currentCard.data.answer}</div>
                </div>
            `;
            currentCard = null;
        }
        modal.classList.remove('active');
    });

    cancelBtn.addEventListener('click', () => {
        currentCard = null;
        modal.classList.remove('active');
    });

    // Initialize the quiz
    renderCategories();
}); 