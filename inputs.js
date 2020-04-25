document.addEventListener("DOMContentLoaded", event => {

    const app = firebase.app();
    const db = firebase.firestore();
    const database = db.collection('midpoints').doc(document.getElementById("userId").innerHTML);

});

function setCoord() {
    const db = firebase.firestore();
    const database = db.collection('midpoints').doc(document.getElementById("userId").innerHTML);

    var aXI = document.getElementById("aXc").value;
    var aYI = document.getElementById("aYc").value;
    var bXI = document.getElementById("bXc").value;
    var bYI = document.getElementById("bYc").value;
    var cXI = document.getElementById("cXc").value;
    var cYI = document.getElementById("cYc").value;
    var process = document.getElementById("processLength").value;

    database.update({aX: Number(aXI)});
    database.update({aY: Number(aYI)});
    database.update({bX: Number(bXI)});
    database.update({bY: Number(bYI)});
    database.update({cX: Number(cXI)});
    database.update({cY: Number(cYI)});
    database.update({stepNumberGoal: Number(process)});

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