$(document).ready(function() {
    $('#btn-apply').on('click', function(e){
    	//console.log(e);
    	
    	$('.is-invalid').removeClass('is-invalid');
    	$('#apply-error').hide();
    	
    	var name = $('input#name');
    	var email = $('input#email');
    	
		$.ajax({
			method: 'POST',
			url: 'http://avanade.gama.academy/api/process_applications',
			dataType: 'json',
			headers: { EMAIL: 'hfjalex@gmail.com' }, // coloque seu email que usou para se inscrever aqui!
			contentType: 'application/json',
			data: JSON.stringify({ process_application: { name: $('#name').val(), email: $('#email').val() } }),
			success: function(json){
				$('#apply-success').show();
				setTimeout(function(){ $('#apply-modal').modal('hide'); }, 2000);
			},
			error: function(jqXHR, textStatus, errorThrown){
				//console.log(jqXHR, textStatus, errorThrown);
				$('#apply-error').show();
				
				var r = jqXHR.responseJSON;

				if( r.name ) name.addClass('is-invalid').next().text( r.name.join('\n') ).addClass('is-invalid');
				else name.addClass('is-valid');
				
				if( r.email ) email.addClass('is-invalid').next().text( r.email.join('\n') ).addClass('is-invalid');
				else email.addClass('is-valid');
				
				console.log(r.email.join('\n'));
			}
		});

    });
});


