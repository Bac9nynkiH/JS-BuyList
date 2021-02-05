var BuyList = {};
BuyList.name = "MyBL";
BuyList.list = [
    { name: "Помідори", count: 1, bought:false },
    { name: "Печиво", count: 1, bought:false },
    { name: "Сир", count: 1, bought:false }
]
var BoughtList={

};
BoughtList.list=[
    
]

var remainder_item_html =
 "<div data-del-id='{{delid}}' class='remainder' id={{remaindId}}><span id='{{item_remainder_id}}' data-del-id='{{delid}}'>{{item}}</span><span class='orangeCircleWithNumber' id={{bought_del_id}} data-del-id='{{bought_delid}}'>{{count}}</span></div>"
var item_html =
    "<div class='row'><span spellcheck='false' data-del-id='{{delid}}' data-item-name='{{delname}}' contenteditable='true' class='item' id={{itemRowId}}>{{item}}</span><div class='UI'><button data-tooltip='toolTip' class='minus' id={{minus}} >-</button><label class='Labelamount'><div class='DivCount' >{{count}}</div></label><button data-tooltip='toolTip' class='plus' id={{plus}}>+</button></div><div class='buttonsAfter' id={{buttonsAfterId}}><button data-tooltip='toolTip' class='NotBuy' id={{NotbuyBtnId}} >не куплено</button></div><div class='buttons' id={{buyId}}><button data-tooltip='toolTip' class='buy' id={{buyBtnId}} >купити</button><button  data-tooltip='toolTip' id={{del_id}} data-del-id='{{delid}}' class='X'>X</button></div></div>"
function showlist() {
    $("#contForRow").html("");
    $("#remainders").html("");
    $('.inCart').html("");
    for (var i = 0; i < BuyList.list.length; i++) {
        var plusBtnId=i;
        var item = BuyList.list[i];
        var del_item_id = "del_buyitem_" + i;
        var del_bought_item_id="del_boughtitem"+i;
       

        var current_remainder_item_html=remainder_item_html
        .replace('{{class}}')
        .replace('{{remaindId}}', 'remaindId_'+i)
        .replace('{{item}}',item.name)
        .replace('{{count}}',item.count)
        .replace("{{delid}}", i)
        .replace('{{item_remainder_id}}','item_remainder_id_'+i)
        .replace('{{del_id}}',del_bought_item_id)
        .replace('{{bought_delid}}',i);

        var current_item_html = item_html
            .replace("{{plus}}",plusBtnId)
            .replace('{{delname}}',item.name)
            .replace('{{itemRowId}}',item.name+i)
            .replace("{{buyId}}",'buy_Id'+i)
            .replace("{{buyBtnId}}",i)
            .replace("{{minus}}", i)
            .replace("{{item}}", item.name)
            .replace('{{count}}', item.count)
            .replace("{{del_id}}", del_item_id)
            .replace("{{delid}}", i)
            .replace('{{NotbuyBtnId}}',i)
            .replace('{{buttonsAfterId}}',i)
            .replace("{{plus}}",plusBtnId);
        $("#contForRow").append(current_item_html);

        $("#remainders").append(current_remainder_item_html);
        var current_bought_remind=current_remainder_item_html.replace('remaindId_' + i, 'boughtRemindId_' + i);
        
        $('.inCart').append(current_bought_remind);

        if(!BuyList.list[i].bought)
            $('#boughtRemindId_' + i).css({ 'display': 'none'});

        $("#" + del_item_id).click(function () {
            remove_item($(this).attr("data-del-id"));
        });
        $('#'+i+'.plus').click(function(){  
            BuyList.list[this.id].count+=1;
            showlist();
        });
        $('#' + i + '.minus').click(function () {
            if (BuyList.list[this.id].count>1){
            BuyList.list[this.id].count -= 1;
            showlist();
            }
        });
        $('#'+ i +'.buy').click(function(){
            BuyList.list[this.id].bought=true;
            showlist();
        });
        $('#' + i + '.NotBuy').click(function () {
            BuyList.list[this.id].bought = false;
            showlist();
        });
        $('#' + item.name + i).keydown(function () {
            var value =$('#' + $(this).attr('data-item-name') + $(this).attr("data-del-id")).html();
            BuyList.list[$(this).attr("data-del-id")].name=value;
            $('#item_remainder_id_' + $(this).attr("data-del-id")).html(value);
        });
       
      
        if(BuyList.list[i].count>1)
        $('#'+i+'.minus').css({'opacity':'1','cursor':'pointer'});
        
        if(BuyList.list[i].bought==true){
        $('#' + i + '.plus').css({ 'display': 'none' });
        $('#' + i + '.minus').css({ 'display': 'none' });
        $('#'+i+'.buttonsAfter').css({'display':'inline-block'});
        $('#' + 'buy_Id' + i).css({'display':'none'});
        $('#' + 'remaindId_' + i).css({'display':'none'});
        $('#'+item.name+i).css({ 'text-decoration': 'line-through' });
        $('#' + 'boughtRemindId_' + i).css({ 'text-decoration': 'line-through' });
        };
        

        
      
        

    }
   
}
showlist();



function remove_item(id) {
    BuyList.list.splice(id, 1);
    showlist();
}
$('.add').click(function() {
    if ($('#textArea').val()!=''){
    BuyList.list.push({
        name: $('#textArea').val(),
        count:1,
        bought:false
    });
    $('#textArea').val("")
    showlist();
}
})


$(document).keypress(function (e) {
    if($('#textArea').is(':focus'))
    if (e.which == 13) {
        if ($("#textArea").val() != "")
            BuyList.list.push({
                name: $("#textArea").val(), 
                count: 1,
                bought: false
            });
        $("#textArea").val("");
        showlist();
    }
});
    
   



