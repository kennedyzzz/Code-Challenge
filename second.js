// declaring variables to be used later
function speedDetector(speed){
    let normalSpeed = 70
    let demerit = 5
    let dPoints = 1
    let warn = (speed - normalSpeed)
    let danger = (warn/demerit) 
    let excess = 60
    let maxSpeed = normalSpeed + excess
    // maximum points are 12 so points more than 12 reads license declined

    // putting in the output to be shown regarding the speed
    if (speed <= normalSpeed) {console.log('Ok')}
    else if(speed >= maxSpeed){console.log('License suspended')}
    else if(speed > normalSpeed){console.log('Points:', + danger)}
    
    
}
//put in the speed in the brackets below
speedDetector()