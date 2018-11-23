window.onload = ()=> {
    appDashBoardFunctions.checkLocalStorage();
    appDashBoardFunctions.generateMembersTable();
}

let appDashBoardFunctions = (()=> {   
    
    let membersArray = [
        {name: 'Wayne Rooney', company: 'Manchester United', status: 'closed', lastUpdated: '7/07/2017', notes:'Highest scorer', key:'12'},
        {name: 'David Beckham', company: 'Manchester United', status: 'closed', lastUpdated: '3/08/2003', notes:'Most stylish player', key:'32'},
        {name: 'Ryan Giggs', company: 'Manchester United', status: 'closed', lastUpdated: '3/08/2011', notes:'Most matches played', key:''},
        {name: 'Paul Pogba', company: 'Manchester United', status: 'Active', lastUpdated: '3/08/2011', notes:'United\'s most expensive', key:'34'}
    ];

    const checkLocalStorage = ()=> {
        if (localStorage.getItem("members") === null) {
            localStorage.setItem("members", JSON.stringify(membersArray))
        }
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

    const checkSelected = () => {
      let checkBox = document.querySelectorAll('.chkbox');
      let checkedBoxes = [];
      for(var i=1; i<checkBox.length; i++){
        if(checkBox[i].checked) checkedBoxes.push(checkBox[i])
       }

       if((checkedBoxes.length+1) == checkBox.length) checkBox[0].checked = true;

       else if(checkBox[0].checked == true && (checkedBoxes.length+1) !== checkBox.length) checkBox[0].checked = false;
    };

    const deleteRow = (ele) => {
        ele.parentElement.remove();
        let items = JSON.parse(localStorage.getItem("members"));
        let index = items.findIndex(function(el){
            return el.key === ele.id
        })
        if (index !== -1) items.splice(index, 1);

        items = JSON.stringify(items);
        localStorage.setItem("members", items);
    };

    const alphabeticalSort = ()=> {
        let items = JSON.parse(localStorage.getItem("members"));
        let sortedArray = items.sort((a, b)=>{
            var x = a.name.toLowerCase();
            var y = b.name.toLowerCase();
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
        });
        items = JSON.stringify(sortedArray);
        localStorage.setItem("members", items);
        generateMembersTable();
    }

    const saveItems = ()=> {
        let getcurrentDate = new Date();
        let dd = getcurrentDate.getMonth()+1;
        let mm = getcurrentDate.getDate();
        let yyyy = getcurrentDate.getFullYear();
        let currentDate = dd + '/' + mm + '/' + yyyy;

        let validityCounter = 0;

        document.querySelectorAll('.memberform').forEach((ele)=>{
            if(ele.checkValidity()===true) validityCounter++
        });

        if(validityCounter === 4){
            let saveObject = {
                name: document.getElementById('memberName').value, 
                company: document.getElementById('memberCompany').value, 
                status: document.getElementById('memberStatus').value, 
                lastUpdated: currentDate, 
                notes:document.getElementById('memberNotes').value,
                key:new Date().valueOf()
            };

            membersArray.push(saveObject)
            localStorage.setItem("members", JSON.stringify(membersArray));
            closeModal();
            generateMembersTable();
            validityCounter = 0;
        } else  document.getElementById('modal-error-text').style.display='block';

   
    };

    const generateMembersTable = ()=> {
          let tableId = document.getElementById('div-table');  
          let items = JSON.parse(localStorage.getItem("members"));
          
          let tableHtml = '';
          tableHtml += `
          <div class="div-table-row header">
            <div class="div-table-col"><input type="checkbox" class="chkbox" name="" id="selectAllChkbox" onchange="appDashBoardFunctions.toggleCheckbox(this)"></div>
            <div class="div-table-col" onclick="appDashBoardFunctions.alphabeticalSort()" style="cursor:pointer">Name</div>
            <div class="div-table-col">Company</div>
            <div class="div-table-col">Status</div>
            <div class="div-table-col">Last Updated</div>
            <div class="div-table-col">Notes</div>
            <div class="div-table-col"></div>
         </div>`;

          
          items.map((ele)=>{
              tableHtml += `
              <div class="div-table-row check">
                <div class="div-table-col "><input type="checkbox" class="chkbox" onchange="appDashBoardFunctions.checkSelected()"></div>
                <div class="div-table-col">${ele.name}</div>
                <div class="div-table-col">${ele.company}</div>
                <div class="div-table-col">${ele.status}</div>
                <div class="div-table-col">${ele.lastUpdated}</div>
                <div class="div-table-col">${ele.notes}</div>
                <div class="div-table-col" onclick="appDashBoardFunctions.deleteRow(this)" id="${ele.key}"><i class="material-icons">delete</i></div>
             </div>              
              `
          })
          tableId.innerHTML = '';
          tableId.innerHTML = tableHtml;
    }
  
    const openModal = ()=> {

        let modal = document.getElementById('addMemberPopup'); 
        modal.classList.add('open');
        let modalHtml = '';
        modalHtml += `        
        <div class="modal-window">
            <span class="modal-close" onclick="appDashBoardFunctions.closeModal()"><i class="material-icons">close</i></span>
            <h3 class="modal-header">Add members</h3>
            <div class="modal-body">
            <form action="" id="addMemberForm">
                <label for="memname"><b>Name</b></label>
                <input type="text" name="memname" id="memberName" class="memberform" required>
        
                <label for="memcompany"><b>Company</b></label>
                <input type="text" name="memcompany" id="memberCompany" class="memberform" required>

                <label for="memstatus"><b>Status</b></label>
                <input type="text" name="memstatus" id="memberStatus" class="memberform" required>
                
                <label for="memnotes"><b>Notes</b></label>
                <input type="text" name="memnotes" id="memberNotes" class="memberform" required>
            </form>
            </div>
            <div class="modal-footer">
                <span id="modal-error-text">All fields must be filled</span>
                <button class="btn-default" onclick="appDashBoardFunctions.closeModal()">Cancel</button>
                <button type="submit" id="btnSave" class="btn-primary" onclick="appDashBoardFunctions.saveItems()">Save</button>
            </div>
      </div>`
        modal.innerHTML = '';
        modal.innerHTML = modalHtml;
    };


    //reveal functions
    const returnObject = {
        openModal: openModal,
        closeModal: closeModal,
        toggleCheckbox: toggleCheckbox,
        deleteRow: deleteRow,
        saveItems: saveItems,
        generateMembersTable: generateMembersTable,
        checkLocalStorage: checkLocalStorage,
        alphabeticalSort: alphabeticalSort,
        checkSelected: checkSelected
    }

   return returnObject;

})();


document.getElementById('addMembers').addEventListener('click', function() {
    appDashBoardFunctions.openModal();
});

// document.getElementById('btnSave').addEventListener('click', function(){
//     appDashBoardFunctions.saveItems();
// })






// document.getElementById('add').addEventListener('click', function() {
//     // newItems.push({name: 'Ryan Giggs', company: 'Manchester United', status: 'closed', lastUpdated: '3/08/2011', notes:'Most matches played'})
//     // localStorage.setItem("members", JSON.stringify(newItems))
//     // var items = JSON.parse(localStorage.getItem("members"));
//     console.log(items)
// });

