document.addEventListener('DOMContentLoaded', () => {
    const categoriesContainer = document.getElementById('categories');
    const modal = document.getElementById('answerModal');
    const confirmBtn = document.getElementById('confirmAnswer');
    const cancelBtn = document.getElementById('cancelAnswer');
    
    let currentCard = null;
    let activeCategory = null;
    const answeredQuestions = new Set();

    function renderCategories() {
        categoriesContainer.innerHTML = ''; // Clear existing content
        quizData.categories.forEach(category => {
            // Skip category if all questions are answered
            const unansweredQuestions = category.questions.filter(q => !answeredQuestions.has(JSON.stringify(q)));
            if (unansweredQuestions.length === 0) return;

            const categoryElement = document.createElement('div');
            categoryElement.className = 'category';
            
            const headerElement = document.createElement('div');
            headerElement.className = 'category-header';
            
            const titleElement = document.createElement('h2');
            titleElement.className = 'category-title';
            titleElement.textContent = category.name;
            
            const backButton = document.createElement('button');
            backButton.className = 'back-button';
            backButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                返回
            `;
            backButton.style.display = 'none';
            
            headerElement.appendChild(titleElement);
            headerElement.appendChild(backButton);
            categoryElement.appendChild(headerElement);
            
            const cardsContainer = document.createElement('div');
            cardsContainer.className = 'cards';
            
            // Store category data for later use
            categoryElement.dataset.category = JSON.stringify(category);
            
            // Add click event to category
            categoryElement.addEventListener('click', (e) => {
                if (e.target.closest('.back-button')) {
                    // Handle back button click
                    categoriesContainer.classList.remove('question-mode');
                    activeCategory = null;
                    renderCategories();
                    return;
                }
                
                if (!categoryElement.classList.contains('active')) {
                    showCategoryQuestions(categoryElement, category);
                }
            });
            
            categoryElement.appendChild(cardsContainer);
            categoriesContainer.appendChild(categoryElement);
        });
    }

    function showCategoryQuestions(categoryElement, category) {
        // Hide all other categories
        document.querySelectorAll('.category').forEach(cat => {
            if (cat !== categoryElement) cat.style.display = 'none';
        });
        
        categoryElement.classList.add('active');
        categoriesContainer.classList.add('question-mode');
        
        // Show back button
        const backButton = categoryElement.querySelector('.back-button');
        backButton.style.display = 'flex';
        
        // Clear and create question cards
        const cardsContainer = categoryElement.querySelector('.cards');
        cardsContainer.innerHTML = '';
        
        category.questions.forEach(question => {
            // Skip if question is already answered
            if (answeredQuestions.has(JSON.stringify(question))) return;
            
            const card = createCard(question);
            cardsContainer.appendChild(card);
        });
    }

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
        
        card.addEventListener('click', (e) => {
            if (card.dataset.answered === 'true' || e.target.closest('.show-answer-btn')) return;
            showQuestionConfirmation(card, questionData, cardBack);
        });
        
        return card;
    }

    function showQuestionConfirmation(card, questionData, cardBack) {
        modal.querySelector('h2').textContent = '確認要顯示題目？';
        modal.classList.add('active');
        
        currentCard = {
            element: cardBack,
            data: questionData,
            card: card,
            state: 'question'
        };
    }

    function showAnswerConfirmation(card, questionData, cardBack) {
        modal.querySelector('h2').textContent = '確認要顯示答案？';
        modal.classList.add('active');
        
        currentCard = {
            element: cardBack,
            data: questionData,
            card: card,
            state: 'answer'
        };
    }

    // Modal event listeners
    confirmBtn.addEventListener('click', () => {
        if (!currentCard) return;
        modal.classList.remove('active');
        
        if (currentCard.state === 'question') {
            // Show question and add answer button
            currentCard.element.innerHTML = `
                <div class="question-container">
                    <div class="question-text">${currentCard.data.question}</div>
                    <button class="show-answer-btn">顯示答案</button>
                </div>
            `;
            
            const answerBtn = currentCard.element.querySelector('.show-answer-btn');
            const card = currentCard.card;
            const questionData = currentCard.data;
            const cardBack = currentCard.element;
            
            answerBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Stop event from bubbling up
                showAnswerConfirmation(card, questionData, cardBack);
            });
            
            currentCard.card.classList.add('flipped');
        } else if (currentCard.state === 'answer') {
            // Show answer and mark as answered
            currentCard.element.innerHTML = `
                <div class="answer-container">
                    <div class="answer-text">${currentCard.data.answer}</div>
                </div>
            `;
            
            // Mark question as answered
            const questionStr = JSON.stringify(currentCard.data);
            answeredQuestions.add(questionStr);
            currentCard.card.dataset.answered = 'true';
            
            // Remove the card after a delay
            setTimeout(() => {
                currentCard.card.remove();
                
                // Check if category should be hidden
                const activeCategory = document.querySelector('.category.active');
                if (activeCategory) {
                    const categoryData = JSON.parse(activeCategory.dataset.category);
                    const remainingQuestions = categoryData.questions.filter(q => !answeredQuestions.has(JSON.stringify(q)));
                    if (remainingQuestions.length === 0) {
                        // Return to main view if no questions left
                        categoriesContainer.classList.remove('question-mode');
                        activeCategory.remove();
                        renderCategories();
                    }
                }
            }, 1500);
        }
    });

    cancelBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        if (currentCard && currentCard.state === 'question') {
            currentCard.card.classList.remove('flipped');
        }
        currentCard = null;
    });

    // Initialize the quiz
    renderCategories();
}); 