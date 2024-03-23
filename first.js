function gradeGenerator(marks){ 
    if(marks < 0 || marks > 100){
        console.log("Invalid input")
        return;
    }
    
    if(marks > 79 ){console.log('A')}
    else if(marks >= 60 ){console.log('B')}
    else if(marks >= 49 ){console.log('C')}
    else if(marks >= 40){console.log('D')}
    else if(marks < 40){console.log('E')}
    
    
    }
    gradeGenerator()