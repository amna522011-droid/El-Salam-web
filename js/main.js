
// ==================================
// Mobile Menu
// ==================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});


// ==================================
// Back To Top
// ==================================

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 300 ? "block" : "none";
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// ==================================
// Quiz System
// ==================================

const questions = [
    {
        question: "ما عاصمة جمهورية مصر العربية؟",
        answers: ["الإسكندرية", "القاهرة", "الأقصر"],
        correct: 1
    },
    {
        question: "كم عدد أيام السنة العادية؟",
        answers: ["360 يوماً", "365 يوماً", "366 يوماً"],
        correct: 1
    },
    {
        question: "ما ناتج 12 × 5؟",
        answers: ["50", "55", "60"],
        correct: 2
    },
    {
        question: "ما الكوكب المعروف بالكوكب الأحمر؟",
        answers: ["المريخ", "الزهرة", "المشتري"],
        correct: 0
    },
    {
        question: "ما الغاز الذي تحتاجه النباتات في عملية البناء الضوئي؟",
        answers: ["الأكسجين", "ثاني أكسيد الكربون", "النيتروجين"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("nextQuestion");
const quizContent = document.getElementById("quizContent");
const quizResult = document.getElementById("quizResult");

function showQuestion() {
    answered = false;

    const q = questions[currentQuestion];

    questionElement.textContent =
        `السؤال ${currentQuestion + 1}: ${q.question}`;

    answersElement.innerHTML = "";
    feedback.textContent = "";

    nextButton.disabled = true;
    nextButton.style.opacity = "0.5";

    q.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.className = "answer";
        button.textContent = answer;

        button.addEventListener("click", () => {
            checkAnswer(index, button);
        });

        answersElement.appendChild(button);
    });
}

function checkAnswer(selectedIndex, selectedButton) {
    if (answered) return;

    answered = true;

    const correctIndex = questions[currentQuestion].correct;
    const allButtons = answersElement.querySelectorAll(".answer");

    allButtons.forEach((button, index) => {
        button.disabled = true;

        if (index === correctIndex) {
            button.classList.add("correct");
        }
    });

    if (selectedIndex === correctIndex) {
        score++;
        feedback.textContent = "إجابة صحيحة! أحسنتِ 🌟";
        feedback.style.color = "#27834b";
    } else {
        selectedButton.classList.add("wrong");
        feedback.textContent = "إجابة غير صحيحة، حاولي مرة أخرى ❤️";
        feedback.style.color = "#c0392b";
    }

    nextButton.disabled = false;
    nextButton.style.opacity = "1";
}

nextButton.addEventListener("click", () => {
    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    quizContent.hidden = true;
    quizResult.hidden = false;

    const percentage = Math.round(
        (score / questions.length) * 100
    );

    quizResult.innerHTML = `
        <h2>انتهى الاختبار! 🎉</h2>
        <p>درجتك: ${score} من ${questions.length}</p>
        <p>النسبة المئوية: ${percentage}%</p>
        <p>${percentage >= 60 ? "أحسنتِ! استمري في التفوق 🌸" : "لا تستسلمي، حاولي مرة أخرى 💪"}</p>
        <button class="btn btn-primary" id="restartQuiz">
            إعادة الاختبار
        </button>
    `;

    document.getElementById("restartQuiz").addEventListener("click", () => {
        currentQuestion = 0;
        score = 0;
        quizContent.hidden = false;
        quizResult.hidden = true;
        showQuestion();
    });
}

showQuestion();


// ==================================
// Grade Calculator
// ==================================

const calculateBtn = document.getElementById("calculateBtn");

calculateBtn.addEventListener("click", () => {

    const scoreInput = document.getElementById("studentScore");
    const totalInput = document.getElementById("totalScore");
    const result = document.getElementById("calculatorResult");

    const studentScore = Number(scoreInput.value);
    const totalScore = Number(totalInput.value);

    if (
        scoreInput.value === "" ||
        totalInput.value === "" ||
        !Number.isFinite(studentScore) ||
        !Number.isFinite(totalScore) ||
        totalScore <= 0 ||
        studentScore < 0 ||
        studentScore > totalScore
    ) {
        result.textContent = "من فضلك أدخلي درجات صحيحة.";
        return;
    }

    const percentage = (studentScore / totalScore) * 100;

    result.textContent =
        `نسبتك المئوية: ${percentage.toFixed(2)}% 🌟`;
});


// ==================================
// Contact Form
// ==================================

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("studentName").value.trim();
    const email = document.getElementById("studentEmail").value.trim();
    const message = document.getElementById("message").value.trim();

    const formMessage = document.getElementById("formMessage");

    if (!name || !email || !message) {
        formMessage.textContent = "من فضلك املئي جميع البيانات.";
        return;
    }

    formMessage.textContent =
        "تم التحقق من البيانات بنجاح! هذا نموذج تجريبي ولا يرسل الرسالة فعلياً.";

    contactForm.reset();
});
