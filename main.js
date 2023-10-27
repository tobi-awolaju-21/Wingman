var newQuestion = "This is a question from main.js";

document.addEventListener("DOMContentLoaded", function () {
  // Your JavaScript code here
  function changeText() {
    const textElement = document.getElementById("changingText");
    const texts = [
      "trusted by over 3k STEM students. not sure how it works? click here to learn more",
      "learn an entire course fromm just a single prompt, past question",
      "Get a clear study path from just one question",
      "we ensure you get the best out of every prompt  by pre modifying your input using pre engineered promts",
      "when AI stops  giving solutions to question but rather a course that will equip you with the skills to solve simlilar questions",
    ];
    let currentIndex = 0;

    function updateText() {
      textElement.textContent = texts[currentIndex];
      currentIndex = (currentIndex + 1) % texts.length;
    }

    setInterval(updateText, 5000); // Change text every 4 seconds
  }

  changeText(); // Call the function to start the text change
});

//serach listener
function handleKeyPress(event) {
  if (event.key === "Enter") {
    //hide response holder
    // Using JavaScript to hide the div
var contentDiv = document.querySelector('.content2');
contentDiv.style.display = 'none';
 //hide quizer
    // Using JavaScript to hide the div
    var contentDiv = document.querySelector('.content3');
    contentDiv.style.display = 'none';
// show shimmer
// Using JavaScript to hide the div
var contentDiv = document.querySelector('.content0');
contentDiv.style.display = 'block';

     // original response
     var PalmResponse = "json"
    // Check if the Enter key was pressed
    const inputValue = event.target.value;
    
    // clear original input 

    const mod1 = ' from the question "';

    const mod2 =
      '" i want you to : 1.Identify  and listout and sort the major topics related to the question in order of complexity from the easiest to the most difficult, starting the response for 1 with course outline 2. give a basic  defination on each and also examples 3. use the original question itself as a final example and apply everthing you have explained 4.and also provide a detailed solution to the oriinal question please properly format your response';

    // Your API key and endpoint URL
    const apiKey = "AIzaSyCpmGAUvHpEVHbKVCkPKSUz8oaGqAucRnw";
    const apiUrl =
      "https://generativelanguage.googleapis.com/v1beta3/models/text-bison-001:generateText?key=" +
      apiKey;

    // Prepare the data for the request
    const data = {
      prompt: {
        text: mod1 + inputValue + mod2,
      },
    };

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.candidates && responseData.candidates.length > 0) {
          const output = responseData.candidates[0].output;
          PalmResponse = output;
          console.log("Output: ", output);
          // start of formatting


 // Using JavaScript to hide the div
 var contentDiv = document.querySelector('.content2');
 contentDiv.style.display = 'block';
 // hide shimmer
 // Using JavaScript to hide the div
 var contentDiv = document.querySelector('.content0');
 contentDiv.style.display = 'none';
 //show quiz
 

          // Get the container element
          const container = document.querySelector(".content2");

          // Convert the string output to HTML using marked JS
          const html = marked(output);

          // Set the innerHTML of the container element to the converted HTML
          container.innerHTML = html;

          //end of formating


        // fecth question from page  

        // Prepare the data for the request
        const mod3 = ' from the content in the curly parentensis "{}" generate a set of question and anwers to text my knowledge on it, make it 2 complex questions but your response should be json with do not forget the key  "question:explantion" too and use the format enclosed in the (double hash) ##json-format## "" {';

        const mod4 =
          '} and this is the format for the question ##const quizData = [{ question: "",answers: [{ text: "", correct: false, explanation: "" }, { text: "", correct: true, explanation: "" },{ text: "", correct: false, explanation: "" },],},{question: "",answers: [{text: "",correct: false,explanation: "",},{text: "",correct: false,explanation: "",},{text: "",correct: true,explanation: "",},],},];##  do not miss any of the enlosure, return array not string';
    

    const data = {
      prompt: {
        text: mod3 + PalmResponse + mod4,
      },
    };

        fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((responseData) => {
            if (responseData.candidates && responseData.candidates.length > 0) {
              const output = responseData.candidates[0].output;
              //console.log("Output: ", output);
              newQuestion = output;
                build();
             //buildQuiz(output);
        // shpw quizer on response
        //show quizer
        // Using JavaScript to hide the div
        var contentDiv = document.querySelector('.content3');
        contentDiv.style.display = 'block';
            }else{
              console.log("an error has occured while loading quiz")
            }});


        } else {
          console.error("No candidates in the response");
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }
}
