document.addEventListener("DOMContentLoaded",()=>{
  const recipient="studentsupportquestions@gmail.com";
  const formIds=["contact-form","involvement-interest-form","mentor-interest-form","support-request-form"];

  formIds.forEach(id=>{
    const form=document.getElementById(id);
    if(!form)return;

    form.addEventListener("submit",event=>{
      event.preventDefault();
      if(!form.reportValidity())return;

      const data=new FormData(form);
      const subject=data.get("subject")||"Website Contact";
      const fields=[];

      for(const [key,value] of data.entries()){
        if(!value||key==="subject")continue;
        const label=key.replaceAll("_"," ").replace(/\b\w/g,char=>char.toUpperCase());
        fields.push(`${label}: ${value}`);
      }

      const emailSubject=`Students Support Students — ${subject}`;
      const body=fields.join("\n\n");
      window.location.href=`mailto:${recipient}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(body)}`;
    });
  });
});
