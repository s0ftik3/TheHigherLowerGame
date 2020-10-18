module.exports = (lastTimeUsed) => {

    switch(lastTimeUsed) {
        
        case ((new Date().getTime() - lastTimeUsed) <= 86400000):
            return 'often';
            break;
        case ((new Date().getTime() - lastTimeUsed) >= 86400000):
            return 'rarely';
            break;
        default:
            return 'not defined yet';
            break;

    }
        
}