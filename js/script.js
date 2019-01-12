var data = {"total":0,"rows":[]}; /*Create multi-dimensional array*/
		var totalCost = 0; /*variable for the total price*/
		
		$(function(){
			$('#cartcontent').datagrid({
				singleSelect:true
			});
			$('.item').draggable({ //makes the items draggable
				revert:true, //items don't get moved
				proxy:'clone',//new item made when moving
				onStartDrag:function(){ //create drag behavior
					$(this).draggable('options').cursor = 'not-allowed';
					$(this).draggable('proxy').css('z-index',10); // Allows drag, in front 
																  // of other items on page
				},
				onStopDrag:function(){ //allows for when the drag is stopped
					$(this).draggable('options').cursor='move';
				}
			});
			$('.cart').droppable({ //create the droppable
				onDragEnter:function(e,source){
					$(source).draggable('options').cursor='auto';
				},
				onDragLeave:function(e,source){
					$(source).draggable('options').cursor='not-allowed';
				},
				onDrop:function(e,source){ //identifying info of drop
					var name = $(source).find('p:eq(0)').html();
					var price = $(source).find('p:eq(1)').html();
					/*Take value and parse the £ sign for price*/
					addProduct(name, parseFloat(price.split('£')[1]));
				}
			});
		});
		
		function addProduct(name,price){ //store data in array
			function add(){
				for(var i=0; i<data.total; i++){  //loop checks if the item already exists
					var row = data.rows[i];		  //increments the quantity
					if (row.name == name){
						row.quantity += 1;
						return;
					}
				}
				data.total += 1;
				data.rows.push({ //push new data into the array
					name:name,
					quantity:1,
					price:price
				});
			}
			add();
			totalCost += price; // update 
			$('#cartcontent').datagrid('loadData', data);
			$('div.cart .total').html('Total: $'+totalCost); //total cost update
		}