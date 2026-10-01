document.addEventListener("DOMContentLoaded",()=>{
  const formIds=[
    "contact-form",
    "involvement-interest-form",
    "mentor-interest-form",
    "support-request-form"
  ];

  formIds.forEach(id=>{
    const form=document.getElementById(id);
    if(!form)return;

    form.addEventListener("submit",event=>{
      event.preventDefault();

      const submitButton=form.querySelector('button[type="submit"],input[type="submit"]');
      const originalText=submitButton?.textContent;

      if(submitButton){
        submitButton.disabled=true;
        submitButton.textContent="Not Connected Yet";
      }

      alert(
        "Thanks for reaching out! Online form submissions are not connected yet. Please email studentsupportquestions@gmail.com so our team can receive your message."
      );

      if(submitButton){
        submitButton.disabled=false;
        submitButton.textContent=originalText;
      }
    });
  });
});
