function addRow() {
	if(arAlunos.length != 0){
		var table = document.getElementById("tabela");

		var rowCount = table.rows.length;
		var row = table.insertRow(rowCount);

		var textnode = document.createTextNode(arAlunos[arAlunos.length-1].matricula);
		var cell1 = row.insertCell(0);
		cell1.appendChild(textnode);

		textnode = document.createTextNode(arAlunos[arAlunos.length-1].nome);
		var cell2 = row.insertCell(1);
		cell2.appendChild(textnode);


		var cell3 = row.insertCell(2);
		var btn = document.createElement("submit");
		btn.type = "button";
		btn.innerHTML = "Deletar";
		btn.className = "btn btn-danger";
		btn.setAttribute('onclick', 'confirmDeletion(this)');

		cell3.appendChild(btn);
		sortTable();
	}

}
function confirmDeletion(oButton){
	  modal.style.display = "block";
	  let btn = document.getElementById("deletar");
	  let btn2 = document.getElementById("cancelar");
	  btn.onclick = function(){
	  	removeRow(oButton);
	  	modal.style.display = "none";  
	  }
	  btn2.onclick = function() {
	  modal.style.display = "none";
	}
 }


function removeRow(oButton) {
    var empTab = document.getElementById('tabela');
    for (var i = 0; i < arAlunos.length; i++) {
    	if(arAlunos[i].matricula == empTab.rows[oButton.parentNode.parentNode.rowIndex].cells[0].innerHTML){

    		arAlunos.splice(i, 1);
    	}
    }
    empTab.deleteRow(oButton.parentNode.parentNode.rowIndex);
      // BUTTON -> TD -> TR.
}

function sortTable() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("tabela");
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("td")[0];
      y = rows[i + 1].getElementsByTagName("td")[0];
      //check if the two rows should switch place:
      if (Number(x.innerHTML) > Number(y.innerHTML)) {
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}
function InvalidMsg(textbox) {
	if (textbox.value === '') { 
	    textbox.setCustomValidity 
	          ('É necessário preencher este campo'); 
	} else if (textbox.validity.typeMismatch) { 
	    textbox.setCustomValidity 
	          ('Este formato não é válido'); 
	} else { 
	    textbox.setCustomValidity(''); 
	} 
	return true; 
}

function criarObjeto() {
	var exist = 0;
	var aluno = {
		matricula: document.getElementById("matricula").value,
		nome: document.getElementById("nome").value,
		dataNas: document.getElementById("data").value,
		email: document.getElementById("email").value,
		ddd: document.getElementById("ddd").value,
		numero: document.getElementById("numero").value,
		operadora: document.getElementById("operadora").value,
		campi: document.getElementById("campi").value,
		curso: document.getElementById("curso").value
	};

	if(!document.getElementById('form').checkValidity()){
        return true;
    }
    for (var i = 0; i < arAlunos.length; i++) {
		if(arAlunos[i].matricula == document.getElementById("matricula").value){
			exist = exist + 1;
		}
	}
	if(exist > 0){
		modal1.style.display = "block";
		let btn3 = document.getElementById("cancelar1");
		btn3.onclick = function() {
			modal1.style.display = "none";
		}
		return false;
	}
	else if(exist < 1){
		console.log(exist);
		arAlunos[arAlunos.length] = aluno;
		addRow();
		return false;
	}
}


function changeCampi(){
	var x = document.getElementById("campi").value;
	var select = document.getElementById("curso");
	if (x == "Pici"){
		curso.options[0] = new Option("Computação", "Computação", true);
		curso.options[1] = new Option("Matemática", "Matemática", true);
		curso.options[2] = new Option("Geografia", "Geografia", true);
	}
	else if(x == "Porangabussu"){
		curso.options[0] = new Option("Medicina", "Medicina", true);
		curso.options[1] = new Option("Odontologia", "Odontologia", true);
		curso.options[2] = new Option("Farmácia", "Farmácia", true);
	}
	else{
		curso.options[0] = new Option("Letras", "Letras", true);
		curso.options[1] = new Option("Filosofia", "Filosofia", true);
		curso.options[2] = new Option("Direito", "Direito", true);
	}
}
function showAutor(){
	modal2.style.display = "block";
	let btn3 = document.getElementById("cancelar3");

  	btn3.onclick = function() {
  		modal2.style.display = "none";
  	}
}

var modal = document.getElementById("myModal");
var modal1 = document.getElementById("myModal2");
var modal2 = document.getElementById("myModal3");
var span = document.getElementsByClassName("close")[0];
var span1 = document.getElementsByClassName("close1")[0];
var span2 = document.getElementsByClassName("close2")[0];

span2.onclick = function() {
  modal2.style.display = "none";
}
span1.onclick = function() {
  modal1.style.display = "none";
}

span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}

var arAlunos = [];

document.getElementById("campi").addEventListener("change", changeCampi);
let submit1 = document.getElementById("submit");
submit1.onclick = criarObjeto;

