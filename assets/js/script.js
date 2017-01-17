$(function(){ 
        // CREATE A VOTER
        $('#voterregister').submit(function(e) {
            e.preventDefault(); // STOP THE PAGE FROM RELOADING _ THE DEFAULT ACTION
            
            var _firstname = $('#firstname').val(),
                _lastname = $('#lastname').val(),
                _age = $('#age').val(),
                _mail = $("#mail").val();
            
            $.post('api/voter', {
                firstname: _firstname,
                lastname: _lastname,
                age: _age,
                mail: _mail
            }).done(function(data){
                alert("data loaded: " + data );
                $("body").append('<input type="hidden" id="userId" value="'+data.id+'">');
            });
            
             $('#vote').toggleClass('hidden');
        });
        
       
        
        // CREATE A CANDIDATE
        $('#candidatecreate').submit(function(e) {
            e.preventDefault(); 
            
            var _firstname = $('#firstname').val(),
                _lastname = $('#lastname').val();
            
            $.post('api/candidate', {
                firstname: _firstname,
                lastname: _lastname,
            }).done(function(data){
                alert("data loaded: " + data );
            });   
            
        });
        
    
        // LOAD CANDIDATE LIST
        $.get('api/candidate', function(data){
                $('#candidatelist').empty();
                for(var i=0; i<data.length; i++){
                    var _candidate= "<div class='candidate'><div id='candidatedata'><img src='../img/"+ data[i].firstname +".JPG' id='candidateimg'></img><h3 id='candidatename'>"+ data[i].firstname +" "+ data[i].lastname +"</h3></div> <label for='"+ data[i].firstname +"'></label><input type='radio' name='candidate' id='"+ data[i].firstname +"' value='"+ data[i].firstname +"'></div>";
                    $("#candidatelist").append(_candidate);
                    console.log(_candidate);
                }   
        });
    
    
        console.log('gneu?');
    
  
       
    
    // VOTING
        $('#castyovote').submit(function(e) {
            e.preventDefault(); 
            
        
            
        
            
        });
    
    
 //BASICALLY THE ID OF THE REGISTERED ADDED TO DB WITH THE ID OF CANDIDATE
    
    
    
    })