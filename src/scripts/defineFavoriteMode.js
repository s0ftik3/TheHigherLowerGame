module.exports = (usedTrivia, usedVanilla, usedTime) => {

    switch(usedTrivia, usedVanilla, usedTime) {
        
        case (usedTrivia > usedVanilla && usedTrivia > usedTime):
            return 'trivia';
            break;
        case (usedVanilla > usedTrivia && usedVanilla > usedTime):
            return 'vanilla';
            break;
        case (usedTime > usedTrivia && usedTime > usedVanilla):
            return 'time';
            break;
        default:
            return 'trivia';
            break;

    }
        
}