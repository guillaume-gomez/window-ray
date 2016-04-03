/**
* dans la mesure ou il n'est pas necessaire, on va donc (du moins dans telle que je l'imagine au debut ;)  )
  avoir excluvement des fonctions javascript
**/

function makeTab ()
{
var list = document.getElementById("tabIA");
var nbPlayers = document.getElementById("Number").value;
verif_numeric( IsNumeric('Number') );


if ( nbPlayers > 0 )
{
var tab = "</br></br><table><caption>Ennemies</caption>";
var id ;
	tab += "<tr><th><label for='x'>X</label></th><th><label for='y'>Y</label></th></tr>";
	for ( var i = 0 ; i < nbPlayers ; i++ )
	{
		if ( i % 2 == 0 )
		{
		  id = 'paire';
		}
		else
		{
		  id = 'impaire';
		}
		var num = i ;
		var change = "onchange='setDisabled(this.id);'";
		tab += "<tr ><td  id = '"+id+"'><input type='text' disabled='true' name='x' id='x["+num+"]' "+change+" /></td><td id = '"+id+"' ><input type='text' disabled='true' name='y' "+change+" id='y["+num+"]'/></td></tr>";
	} 
	tab += "</table>";
}
else
{
tab ="";
}

list.innerHTML = tab;
}


function verifNumber(ID)
{
	var number = document.getElementById(ID).value;
	if ( number > 20)
	{
	   document.getElementById(ID).value = 20 ;
	}
	
	if ( number  < 0 )
	{
		document.getElementById(ID).value = 0 ;
	}

}

function IsNumeric (ID)
{
	var number = document.getElementById(ID).value;

	if ( !verif_numeric(number) )
	{
	   alert ('ce n\'est pas un nombre');
	   document.getElementById(ID).value = 0 ;
	}

}

function verif_numeric(variable)
{
   var exp = new RegExp("^[0-9]+$","g");
   return exp.test(variable);
}

function setDisabled ( ID )
{
	if ( document.getElementById(ID).value == '' )
	{
		document.getElementById(ID).disabled = true;
	}

}

function empty ( ID )
{
	 document.getElementById(ID).value = '';
}