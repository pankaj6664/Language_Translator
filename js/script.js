selectTage=document.querySelectorAll("select");
translateBtn=document.querySelector("button");
from_text=document.querySelector(".from-text");
to_text=document.querySelector(".to-text");
exchangeIcon=document.querySelector(".exchange");
icons=document.querySelectorAll(".row i");

selectTage.forEach((tag,id)=>{
    for(const country_code in countries)
    {
        // console.log(countries[country_code]);
        let selected;
        if(id==0 && country_code=="en-GB")
        {
            selected="selected";
        } 
        else if(id==1 && country_code=="hi-IN")
        {
            selected="selected";
        }
        let option=`<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);  //adding option tag in select tag
    }
});

//Exchange button event handling
exchangeIcon.addEventListener("click",() => {
    let tempText=from_text.value;
    tempLang=selectTage[0].value;
    from_text.value=to_text.value;
    selectTage[0].value=selectTage[1].value;
    to_text.value=tempText;
    selectTage[1].value=tempLang;
});

//Translate button event handling
translateBtn.addEventListener("click",() => {
    let text=from_text.value;
    translateFrom=selectTage[0].value;  
    translateTo=selectTage[1].value;
    if(!text) return;
    to_text.setAttribute("placeholder","Translating.......");
    //mymemory api calls 
    let apiURL=`https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiURL).then(res => res.json()).then(data => {
        // console.log(data); //API response test
        to_text.value =data.responseData.translatedText
        to_text.setAttribute("placeholder","Translation");
    })
});

//Working on volume and copy icons from both sides
icons.forEach(icon => {
    icon.addEventListener("click", ({target}) => {
        if(target.classList.contains("fa-copy"))
        {
            if(target.id == "from")
            {
                navigator.clipboard.writeText(from_text.value);
            }
            else 
            {
                navigator.clipboard.writeText(to_text.value);
            }
        }
        else
        {
            let utterance;
            if(target.id == "from")
            {
                utterance=new SpeechSynthesisUtterance(from_text.value); 
                utterance.lang=selectTage[0].value;
            }
            else 
            {
                utterance=new SpeechSynthesisUtterance(to_text.value); 
                utterance.lang=selectTage[1].value;
            }
            speechSynthesis.speak(utterance); //speak the passed utterance
        }
    });
});