

/* Dados a serem enviado para a api http://api.actualsales.com.br/join-asbr/ti/lead
 -- nome (String)
 -- email (String)
 -- telefone (String)
 -- regiao (Elemento do conjunto ["Norte", "Nordeste", "Sul", "Sudeste", "Centro-Oeste"])
 -- unidade (Elemento do conjunto ["Porto Alegre", "Curitiba", "São Paulo", "Rio de Janeiro", "Belo Horizonte", "Brasília", "Salvador", "Recife", "INDISPONÍVEL"])
 -- data_nascimento (data no formato YYYY-mm-dd)
 -- score (int de 0 a 10)
 -- token (String) 

 token =  544ca5a21b4873fe7137b108c1a3e5de
*/


$(function () {
	    $('.next-step').click(function (event) {
	        event.preventDefault();
	        
//Guarda formulário
			var token = "544ca5a21b4873fe7137b108c1a3e5de";

			//Recebe os valores inseridos nos campos do 1º step
			fields = $('input');
	        var nome = fields[0].value;
	        var nascimento = fields[1].value;
	        var email = fields[2].value;
	        var telefone = fields[3].value;

	        //array de valores que devem ser enviados 
	        var lead =[nome.value,email.value,telefone.value];

//Calcula idade
			//Calcula a idade pegando como base 1 de novembro de 2016 e a insere no array de valores que devem ser enviados 
	        const d = new Date("2016 november 1");
	        const anoAtual = d.getFullYear();
			        nascimento = nascimento.split("/");
						ano = nascimento[0]; 
						mes = nascimento[1];
						dia = nascimento[2];
						ano = parseInt( ano );
			idade = ( anoAtual - ano );
			lead.push[idade]; //Adiciona idade ao array que deve ser enviado


//Calcula Score baseado na idade 
			$score = 10;   //Score inicial 

			//idade
			if (99 > idade > 40){ //Entre 40 e 99 anos o score recebe 3 pontos negativos
				$score -=3;
					}else if (39 > idade > 18){ //Entre 18 e 29 anos o score não recebe pontos
						$score = $score;
							}else  {$score -=5;}//Fora essas idades o score recebe 5 pontos negativos 

// Seleciona unidade e afeta score
	        $("select[name='regiao']").on('change', function () {
	        	//Função chamada quando o campo de região recebe um valor
            	$regiao = $("option:selected", this).text();
            	//Recebe a opção de região selecionada para acrescentar opções ao campo de unidade 
            	lead.push[$regiao];
	            	switch($regiao) {
	            		case 'Sul': //Caso a região Sul seja selecionada
	            			$score -=2;
	            			$("select[name='unidade']").html('<option>Selecione a unidade mais próxima</option><option>Porto Alegre</option><option>Curitiba</option>');
	            			lead.push[$score];
	            			break;
	            		case 'Sudeste': //Caso a região Sudeste seja selecionada
	            			$score -=1;
	            			lead.push[$score];
	            			$("select[name='unidade']").html('<option>Selecione a unidade mais próxima</option><option>São Paulo</option><option>Rio de Janeiro</option><option>Belo Horizonte</option>');
	            			break;
	            		case 'Centro-Oeste': //Caso a região Centro Oeste seja selecionada
	            			$score -=3;
	            			lead.push[$score];
	            			$("select[name='unidade']").html('<option>Selecione a unidade mais próxima</option><option>Brasília</option>');
	            			break;
	            		case 'Nordeste': //Caso a região Nordeste seja selecionada
	            			$score -=4;
	            			lead.push[$score];
	            			$("select[name='unidade']").html('<option>Selecione a unidade mais próxima</option><option>Salvador</option><option>Recife</option>');
	            			break;
	            		case 'Norte': //Caso a região Norte seja selecionada
	            			$score -=5;
	            			lead.push[$score];
	            			$("select[name='unidade']").html('<option>Selecione a unidade mais próxima</option><option>Não possui disponibilidade</option>');
	            			break;
	            		default: //Caso nenhuma região seja selecionada
	            			$score = $score;
	            			lead.push[$score];
	            			$("select[name='unidade']").html('<option>Selecione a unidade mais próxima</option>');
	            	}
        	});

	        $("select[name='unidade']").on('change', function () {
	        	//Recebe a opção selecionada e a adiciona no array de dados a serem enviados 
	        	$unidade = $("option:selected",this).text();
	        	lead.push($unidade);
	        	var unidade = $('#unidade').text();
	        	switch($unidade){
	        		case 'São Paulo':
	        			//Caso a unidade seja São Paulo, o score não deve mudar, como a região sudeste tem 1 ponto negativo no score quando são paulo for selecionado 1 ponto será acrescido e assim o score volta a estaca zero
	        			$score += 1;
	        		break;
	        		default:
	        		$score = $score;
	        		break;
	        	} 
	        });
			
//Verifica campos vazios antes de prosseguir para o próximo step 
	        for (i = 0; i < fields.length; i++) {
	        	valor = fields[i].value;
	        	if (valor == "") {

	        		return alert("O campo " + fields[i].name + " não foi preenchido corretamente");	
	        	}

	        }

			$(this).parents('.form-step').hide().next().show();       
	    });
	});

	



