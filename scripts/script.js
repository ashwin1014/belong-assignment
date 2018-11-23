var appDashBoardFunctions = (()=> {   
    
    // let membersArray = [
    //     {name: 'Wayne Rooney', company: 'Manchester United', status: 'closed', lastUpdated: '7/07/2017', notes:'Highest scorer'},
    //     {name: 'David Beckham', company: 'Manchester United', status: 'closed', lastUpdated: '3/08/2003', notes:'Most stylish player'},
    // ]
  
    let openModal = ()=> {
        document.getElementById('addMemberPopup').classList.add('open');
    };

    let closeModal = ()=> {
        document.getElementById('addMemberPopup').classList.remove('open');
    };


    //reveal functions
    var returnObject= {
        openModal: openModal,
        closeModal: closeModal
    }

   return returnObject;

})();

   

// window.addEventListener('load', function() {

// }, false)

document.getElementById('addMembers').addEventListener('click', function() {
    appDashBoardFunctions.openModal();
});

// document.getElementById('add').addEventListener('click', function() {
//     // newItems.push({name: 'Ryan Giggs', company: 'Manchester United', status: 'closed', lastUpdated: '3/08/2011', notes:'Most matches played'})
//     // localStorage.setItem("members", JSON.stringify(newItems))
//     // var items = JSON.parse(localStorage.getItem("members"));
//     console.log(items)
// });

