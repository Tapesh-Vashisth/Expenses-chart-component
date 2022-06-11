let xhr = new XMLHttpRequest();

const maxheight = 90;

xhr.onload = function(){
    if (xhr.status == 200){
        let response = JSON.parse(xhr.responseText);
        let max = response[0].amount;
        for (let i = 0; i < response.length; i++){
            if (response[i].amount > max){
                max = response[i].amount;
            }
        }


        
        let bars = document.getElementsByClassName("bar");

        for (let i = 0; i < bars.length; i++){
            let height = (response[i].amount/max)*maxheight;
            bars[i].style.height = `${height}px`;
        }

        let today = new Date().getDay() - 1;
        bars[today].style.backgroundColor = "hsl(186, 34%, 60%)";

        let hovers = document.getElementsByClassName("hover");
        
        for (let i = 0; i < bars.length; i++){
            bars[i].addEventListener("mouseover", function(e){
                let target = e.target;
                let brother = target.previousElementSibling;
                let find;
                for (let i = 0; i < bars.length; i++){
                    if (target === bars[i]){
                        find = i;
                        break;
                    }
                }
               
                brother.style.display = "block";
                brother.textContent = response[find].amount;
            })

            bars[i].addEventListener("mouseout", function(e){
                let target = e.target;
                let brother = target.previousElementSibling;
                brother.style.display = "none";
            })
        }


    }
};

xhr.open('GET', 'data.json', true);

xhr.send(null);