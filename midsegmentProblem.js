var elt = document.getElementById('calculator');
var calculator = Desmos.GraphingCalculator(elt);

document.addEventListener("DOMContentLoaded", event => {

    document.getElementById("documentData").style.display = "none";

    const app = firebase.app();
    const db = firebase.firestore();
    const database = db.collection('midpoints').doc(document.getElementById("userId").innerHTML);

    database.get()
        .then(doc => {
            const data = doc.data();

            calculator.setExpression({
            type: 'table',
            columns: [
                {
                latex: 'x1',
                values: [data.aX, data.bX, data.cX, data.aX]
                },
                {
                latex: 'y1',
                values: [data.aY, data.bY, data.cY, data.aY],
                columnMode: Desmos.ColumnModes.LINES
                }
            ]
            });
    });

});

function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    
    firebase.auth().signInWithPopup(provider)
        
            .then(result => {
                const user = result.user;
                document.getElementById("userId").innerHTML = `${user.uid}`;
                console.log(`${user.uid}`);
                document.getElementById("userId").style.display = "none";
                document.getElementById("loginSystem").style.display = "none";
                const db = firebase.firestore();
                var database = db.collection('midpoints').doc(document.getElementById("userId").innerHTML);
                database.get()
                    .then(doc => {
                        const data = doc.data();
                        if(typeof data === "undefined"){
                            database.set({userID: document.getElementById("userId").innerHTML, name: `${user.displayName}`, aX: 0, aY: 0, bX: 1, bY: 1, cX: 2, cY: 0, stepNumber: 0, stepNumberGoal: 10});
                        }
                        document.getElementById("documentData").style.display = "block";
                        database.update({stepNumber: 0});
                    });
            });
}

function calculate() {
    const db = firebase.firestore();
    const database = db.collection('midpoints').doc(document.getElementById("userId").innerHTML);

    calculateP2();

    database.get()
        .then(doc => {
            const data = doc.data();

            calculator.setExpression({
            type: 'table',
            columns: [
                {
                latex: 'x',
                values: [data.aX, data.bX, data.cX, data.aX]
                },
                {
                latex: 'y',
                values: [data.aY, data.bY, data.cY, data.aY],
                columnMode: Desmos.ColumnModes.LINES
                }
            ]
            });
    });
}

function calculateP2() {
    const db = firebase.firestore();
    const database = db.collection('midpoints').doc(document.getElementById("userId").innerHTML);
    database.get()
        .then(doc => {
            const data = doc.data();

            var stepNumber = 0;
            
            //Coordinates of point A
            var aX = data.aX;
            var aY = data.aY; 
            
            //Coordinates of point B
            var bX = data.bX;
            var bY = data.bY; 
            
            //Coordinates of point C
            var cX = data.cX;
            var cY = data.cY; 

            var midpointABX = (bX + aX)/2;
            var midpointABY = (bY + aY)/2;

            var midpointBCX = (cX + bX)/2;
            var midpointBCY = (cY + bY)/2;

            var midpointACX = (cX + aX)/2;
            var midpointACY = (cY + aY)/2;

            var stepNumber = data.stepNumber + 1;
            database.update({stepNumber: stepNumber})

            //New coordinates of point A
            var aX = midpointABX;
            var aY = midpointABY; 

            //New coordinates of point B
            var bX = midpointBCX;
            var bY = midpointBCY; 

            //New coordinates of point C
            var cX = midpointACX;
            var cY = midpointACY;

            if (data.stepNumber == data.stepNumberGoal - 1) {
                console.log("(" + aX + ", " + aY + ")")
                output();
            } else if (data.stepNumber < data.stepNumberGoal - 1) {
                console.log("New coordinates of point A: " + aX + ", " + aY);
                console.log("New coordinates of point B: " + bX + ", " + bY);
                console.log("New coordinates of point C: " + cX + ", " + cY);
                database.update({aX: midpointABX});
                database.update({aY: midpointABY});
                database.update({bX: midpointBCX});
                database.update({bY: midpointBCY});
                database.update({cX: midpointACX});
                database.update({cY: midpointACY});
                window.setTimeout(calculate, 1500);
            }
        });
}

function output() {
    const db = firebase.firestore();
    const database = db.collection('midpoints').doc(document.getElementById("userId").innerHTML);
    
    database.get()
        .then(doc => {
            const data = doc.data();

            var stepNumber = 0;
            var stepNumberGoal = 5000;

            //Coordinates of point A
            var aX = data.aX;
            var aY = data.aY; 
            
            //Coordinates of point B
            var bX = data.bX;
            var bY = data.bY; 
            
            //Coordinates of point C
            var cX = data.cX;
            var cY = data.cY; 

            var midpointABX = (bX + aX)/2;
            var midpointABY = (bY + aY)/2;

            var midpointBCX = (cX + bX)/2;
            var midpointBCY = (cY + bY)/2;

            var midpointACX = (cX + aX)/2;
            var midpointACY = (cY + aY)/2;

            var stepNumber = stepNumber + 1;

            //New coordinates of point A
            var aX = midpointABX;
            var aY = midpointABY; 

            //New coordinates of point B
            var bX = midpointBCX;
            var bY = midpointBCY; 

            //New coordinates of point C
            var cX = midpointACX;
            var cY = midpointACY;

            while (stepNumber <= stepNumberGoal) {
                var midpointABX = (bX + aX)/2;
                var midpointABY = (bY + aY)/2;
            
                var midpointBCX = (cX + bX)/2;
                var midpointBCY = (cY + bY)/2;
            
                var midpointACX = (cX + aX)/2;
                var midpointACY = (cY + aY)/2;
            
                var stepNumber = stepNumber + 1;
            
                //New coordinates of point A
                var aX = midpointABX;
                var aY = midpointABY; 
            
                //New coordinates of point B
                var bX = midpointBCX;
                var bY = midpointBCY; 
            
                //New coordinates of point C
                var cX = midpointACX;
                var cY = midpointACY;
            
                if (stepNumber == stepNumberGoal + 1) {
                    document.getElementById("centerPoint").innerHTML = "The Center is at: (" + aX + ", " + aY + ")";
                    calculator.setExpression({
                        type: 'table',
                        columns: [
                          {
                            latex: 'x',
                            values: [aX]
                          },
                          {
                            latex: 'y',
                            values: [aY],
                          }
                        ]
                      });
                } 
            }

        });
}
