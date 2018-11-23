window.onload = ()=> {
    appDashBoardFunctions.displayTable();
    appDashBoardFunctions.checkLocalStorage();
}

let appDashBoardFunctions = (()=> {   
    
    let membersArray = [
        {name: 'Wayne Rooney', company: 'Manchester United', status: 'closed', lastUpdated: '7/07/2017', notes:'Highest scorer'},
        {name: 'David Beckham', company: 'Manchester United', status: 'closed', lastUpdated: '3/08/2003', notes:'Most stylish player'},
        {name: 'Ryan Giggs', company: 'Manchester United', status: 'closed', lastUpdated: '3/08/2011', notes:'Most matches played'},
        {name: 'Paul Pogba', company: 'Manchester United', status: 'Active', lastUpdated: '3/08/2011', notes:'United\'s most expensive'}
    ];

    const checkLocalStorage = ()=> {
        if (localStorage.getItem("members") === null) {
            localStorage.setItem("members", JSON.stringify(membersArray))
        }
    }

    const saveItems = ()=> {
        let saveObject = {
            name: document.getElementById('memberName').value, 
            company: document.getElementById('memberCompany').value, 
            status: document.getElementById('memberStatus').value, 
            lastUpdated: document.getElementById('memberLastUpdate').value, 
            notes:document.getElementById('memberNotes').value
        };
        membersArray.push(saveObject)
        localStorage.setItem("members", JSON.stringify(membersArray));
        closeModal()
    }

    const generateMembersTable = ()=> {
        
    }
  
    const openModal = ()=> {
        document.getElementById('addMemberPopup').classList.add('open');
    };

    const closeModal = ()=> {
        document.getElementById('addMemberPopup').classList.remove('open');
    };

     const toggleCheckbox = (ele)=> {
        let checkbox = document.querySelectorAll('.chkbox');
        checkbox.forEach((item)=>{
            if(item !== ele) item.checked = ele.checked
       });
    };

    const deleteRow = (ele) => {
        ele.parentElement.remove();
    };

    let displayTable = () => {
     //   console.log(membersArray);
    }



    //reveal functions
    const returnObject = {
        openModal: openModal,
        closeModal: closeModal,
        toggleCheckbox: toggleCheckbox,
        deleteRow: deleteRow,
        saveItems: saveItems,
        displayTable: displayTable,
        checkLocalStorage: checkLocalStorage
    }

   return returnObject;

})();


document.getElementById('addMembers').addEventListener('click', function() {
    appDashBoardFunctions.openModal();
});

document.getElementById('btnSave').addEventListener('click', function(){
    appDashBoardFunctions.saveItems();
})



// document.getElementById('add').addEventListener('click', function() {
//     // newItems.push({name: 'Ryan Giggs', company: 'Manchester United', status: 'closed', lastUpdated: '3/08/2011', notes:'Most matches played'})
//     // localStorage.setItem("members", JSON.stringify(newItems))
//     // var items = JSON.parse(localStorage.getItem("members"));
//     console.log(items)
// });

