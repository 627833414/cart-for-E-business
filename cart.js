$(function () {
    $("#all").on("click",function () {
        $(".content_2").find(".checkItem").prop("checked", this.checked);
        showTotalNum();
    })
    $("#delete").on("click",function () {
        $(".content_2").find(".checkItem").prop("checked", false);
        $("#all").prop("checked", false);
    })
    $(".checkItem").click(function(){
        var checkNum=$(".checkItem");
        $("#all").prop("checked",checkNum.length==checkNum.filter(":checked").length)
    })
    //计算某一行的商品总价
    var showCurrentLinePrice = function (target) {
        var unitPrice = Number(target.parents(".commodity").find(".unitPrice").text());
        var cartNumber = Number(target.parents(".commodity").find(".cartNumber").text());
        target.parents(".commodity").find(".commodityTotal").text("￥" + unitPrice * cartNumber);
    }
    //2.重新计算选中的商品的个数及总价
    var showTotalNum = function(){
        var totalCount = 0;
        var totalAmount = 0;
        $(".content_2").find(".commodity").each(function () {
            var target = $(this);
            if (target.find(".checkItem").prop("checked")){
                //r如果当前行已选中，则需要累加金额和数量
                var currentNumber = Number(target.find(".cartNumber").text());
                totalCount += currentNumber;
                totalAmount += currentNumber * Number(target.find(".unitPrice").text());
            }
        })
        $(".totalCount").text(totalCount);
        $(".totalAmount").text("￥" + totalAmount);
    }
    $(".checkItem").on("click",function(){
        var target=$(this);
        showCurrentLinePrice(target);
        showTotalNum();
    })
    $(".content_2").on("click",".reduce",function () {
        var target = $(this);
        var cartNumber = Number(target.parents(".commodity").find(".cartNumber").text());
        if (cartNumber <= 1){
            return;
        }else{
            cartNumber --;
            target.parents(".commodity").find(".cartNumber").text(cartNumber);
        }
        //1.计算当前行商品总价
        showCurrentLinePrice(target);
        //2.重新计算选中的商品的个数和总价
        showTotalNum();
    })
    $(".content_2").on("click",".add",function(){
        var target=$(this);
        var cartNumber=Number(target.parents(".commodity").find(".cartNumber").text());
        cartNumber++;
        target.parents(".commodity").find(".cartNumber").text(cartNumber);
        showCurrentLinePrice(target);
        showTotalNum();
    })
    $(".content_2").on("click",".content_2_in_delete",function(){
        $(this).parents(".content_2").remove();
    })
})
