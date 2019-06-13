$(document).ready(function(){

    //hides dropdown content
    $(".size_chart").hide();
    
    //unhides first option content
    $("#option1").show();
    
    //listen to dropdown for change
    $("#size_select").change(function(){
      //rehide content on change
      $('.size_chart').hide();
      //unhides current item
      $('#'+$(this).val()).show();
    });
    
  });




  function myFunction(){
    var name = $("#name").val();
    var password=$("#password").val();
   
    $.ajax({
                type : 'post',
                //remove the .php from results.php.php
                url : "http://localhost:3000/login",
                //Add the request header
                
                contentType : 'application/x-www-form-urlencoded',
                //Add form data
                data : {name : name,password : password},
                success : function(response) {
                    $(".login").html(response)},
                error : function(xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    console.log(err);                   
                }
                
            }); //End of Ajax
    }




    function myFunction2(){
        var idvalue = $("#id").val();
        var keyvalue=$("#key").val();
       
        $.ajax({
                    type : 'get',
                    //remove the .php from results.php.php
                    url : "http://localhost:3000/employee",
                    //Add the request header
                    headers : {
                        Authorization :  keyvalue
                    },
                    contentType : 'application/x-www-form-urlencoded',
                    //Add form data
                    data : {id : idvalue,key : keyvalue},
                    success : function(response) {
                        $(".get").html(response)},
                    error : function(xhr, status, error) {
                        var err = eval("(" + xhr.responseText + ")");
                        console.log(err);                   
                    }
                }); //End of Ajax

        }




        function myFunction3(){
            var idvalue = $("#id").val();
            var keyvalue=$("#key").val();
            var namevalue = $("#name").val();
    
            var salaryvalue = $("#salary").val();
    
            var agevalue = $("#age").val();
    
           
            $.ajax({
                        type : 'post',
                        //remove the .php from results.php.php
                        url : "http://localhost:3000/employee",
                        //Add the request header
                        headers : {
                            Authorization :  keyvalue
                        },
                        contentType : 'application/x-www-form-urlencoded',
                        //Add form data
                        data : {id : idvalue,key : keyvalue,name:namevalue,salary:salaryvalue,age:agevalue},
                        success : function(response) {
                            $(".post").html(response)},
                        error : function(xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            console.log(err);                   
                        }
                    }); //End of Ajax

            }




            function myFunction4(){
                var idvalue = $("#id").val();
                var keyvalue=$("#key").val();
               
                $.ajax({
                            type : 'post',
                            //remove the .php from results.php.php
                            url : "http://localhost:3000/employee?_method=DELETE",
                            //Add the request header
                            headers : {
                                Authorization :  keyvalue
                            },
                            contentType : 'application/x-www-form-urlencoded',
                            //Add form data
                            data : {id : idvalue,key : keyvalue},
                            success : function(response) {
                                $(".delete").html(response)},
                            error : function(xhr, status, error) {
                                var err = eval("(" + xhr.responseText + ")");
                                console.log(err);                   
                            }
                        }); //End of Ajax

                }




                function myFunction5(){
                    var idvalue = $("#id").val();
                    var keyvalue=$("#key").val();
                    var namevalue = $("#name").val();
            
                    var salaryvalue = $("#salary").val();
            
                    var agevalue = $("#age").val();
            
                   
                    $.ajax({
                                type : 'post',
                                //remove the .php from results.php.php
                                url : "http://localhost:3000/employee?_method=PUT",
                                //Add the request header
                                headers : {
                                    Authorization :  keyvalue
                                },
                                contentType : 'application/x-www-form-urlencoded',
                                //Add form data
                                data : {id : idvalue,key : keyvalue,name:namevalue,salary:salaryvalue,age:agevalue},
                                success : function(response) {
                                    $(".update").html(response)},
                                error : function(xhr, status, error) {
                                    var err = eval("(" + xhr.responseText + ")");
                                    console.log(err);                   
                                }
                            }); //End of Ajax

                    }




                