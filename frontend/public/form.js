		$('.edit').on('click',function(){

		var row = $(this).parents('tr').children();
		var name = $(row[0]).text();
		var email = $(row[1]).text();
		var address = $(row[2]).text();
		var phone = $(row[3]).text();
		var id = row.find('#id').val();

		var form = $('#edit').find('form');
		form.find("[name='name']").val(name);
		form.find("[name='email']").val(email);
		form.find("[name='address']").val(address);
		form.find("[name='phone']").val(phone);
		form.find("#id").val(id);

	})


	$('.delete').on('click',function(){

		var row = $(this).parents('tr').children();
		var name = $(row[0]).text();
		var id = row.find('#id').val();
		console.log(name)
		
		var form = $('#delete').find('form');
		form.find("[name='title']").text("Delete" + name + "?");
		form.find("#id").val(id);

	})