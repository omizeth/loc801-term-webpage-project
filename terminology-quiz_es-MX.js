function submitAnswers() {
  const questions = {
      q1: {
          correct: "False",
          correctFeedback: "¡Correcto! “Es importante recordar que apesar de que las comunidades utilicen una lengua en común, no significa que compartan exactamente la misma conceptualización de cada objeto que se designa. Por ejemplo, si se les pidiera que dibujaran su conceptualización de una mesa, ningún hablante dibujaría la misma, ya que cada uno recurriría al inventario mental de las mesas que ha encontrado o imaginado a lo largo de su vida. Lo cual es significativo porque quienes están fuera de las profesiones de los servicios lingüísticos y la localización suelen asumir que el significado reside en la designación. Sin embargo, las palabras en sí son arbitrarias y vacías. El significado, en realidad, está en el ojo, o en el cerebro, del observador. (Alaina Brandt,<i>Getting Started with Terminology Management</i>, The ATA Chronicle)",
          incorrectFeedback: {
              "True": "Incorrecto. “Es importante recordar que apesar de que las comunidades utilicen una lengua en común, no significa que compartan exactamente la misma conceptualización de cada objeto que se designa. Por ejemplo, si se les pidiera que dibujaran su conceptualización de una mesa, ningún hablante dibujaría la misma, ya que cada uno recurriría al inventario mental de las mesas que ha encontrado o imaginado a lo largo de su vida. Lo cual es significativo porque quienes están fuera de las profesiones de los servicios lingüísticos y la localización suelen asumir que el significado reside en la designación. Sin embargo, las palabras en sí son arbitrarias y vacías. El significado, en realidad, está en el ojo, o en el cerebro, del observador. (Alaina Brandt,<i>Getting Started with Terminology Management</i>, The ATA Chronicle)",
          }
      },
      q2: {
          correct: "use in a specific subject field",
          correctFeedback: "¡Correcto!  El lenguaje especializadado es un lenguaje natural utilizado en un ámbito temático y caracterizada por el uso de medios de expresión específicos (ISO 1087)",
          incorrectFeedback: {
              "independent of any specific subject field": "Incorrecto.  El lenguaje especializadado es un lenguaje natural utilizado en un ámbito temático y caracterizada por el uso de medios de expresión específicos (ISO 1087).",
          }
      },
      q3: {
          correct: "rendering of ideas",
          correctFeedback: "¡Correcto!",
          incorrectFeedback: {
              "written content": "Incorrecto. Una carcaterística en común de la traducción y la interpretación es que ambas traducen ideas que se expresan en una lengua a otra.",
              "verbal content": "Incorrecto. Una carcaterística en común de la traducción y la interpretación es que ambas traducen ideas que se expresan en una lengua a otra."
          }
      }
  };

  try {
    const form = document.forms["quizForm"];
    if (!form) {
        throw new Error("Quiz form not found");
    }

    let unansweredQuestions = [];
    let totalCorrect = 0;

    // Loop through each question
    for (const question in questions) {
        const radioButtons = form[question];
        const feedbackElement = document.getElementById("feedback_" + question);
        
        if (!feedbackElement) {
            throw new Error(`Feedback element for question ${question} not found`);
        }

        if (!radioButtons) {
            throw new Error(`Radio buttons for question ${question} not found`);
        }

        // Check if question is answered
        const selectedValue = radioButtons.value;
        if (selectedValue === "") {
            unansweredQuestions.push(question.replace('q', ''));
            continue;
        }

        // Process answer
        const isCorrect = selectedValue === questions[question].correct;
        if (isCorrect) {
            totalCorrect++;
            feedbackElement.innerHTML = questions[question].correctFeedback;
            feedbackElement.style.color = "green";
        } else {
            feedbackElement.innerHTML = questions[question].incorrectFeedback[selectedValue] || "Incorrecto. Vuelve a intentarlo.";
            feedbackElement.style.color = "red";
        }

        // Make feedback accessible to screen readers
        feedbackElement.setAttribute('role', 'alert');
    }

    // Handle unanswered questions
    if (unansweredQuestions.length > 0) {
        const errorMsg = `Please answer ${unansweredQuestions.length === 1 ? 'question' : 'questions'} ${unansweredQuestions.join(', ')}`;
        const errorElement = document.getElementById('quiz-error') || createErrorElement();
        errorElement.textContent = errorMsg;
        errorElement.style.display = 'block';
        return false;
    }

    // Announce final score to screen readers
    const scoreAnnouncement = document.createElement('div');
    scoreAnnouncement.setAttribute('role', 'status');
    scoreAnnouncement.setAttribute('aria-live', 'polite');
    scoreAnnouncement.className = 'sr-only';
    scoreAnnouncement.textContent = `You got ${totalCorrect} out of ${Object.keys(questions).length} questions correct`;
    document.querySelector('.quiz-container').appendChild(scoreAnnouncement);

} catch (error) {
    console.error('Quiz error:', error);
    const errorElement = document.getElementById('quiz-error') || createErrorElement();
    errorElement.textContent = 'An error occurred while processing your answers. Please refresh the page and try again.';
    errorElement.style.display = 'block';
}

return false;
}

function createErrorElement() {
const errorElement = document.createElement('div');
errorElement.id = 'quiz-error';
errorElement.className = 'error-message';
errorElement.setAttribute('role', 'alert');
errorElement.style.color = 'red';
document.querySelector('.quiz-container').insertBefore(errorElement, document.querySelector('#quizForm'));
return errorElement;
}