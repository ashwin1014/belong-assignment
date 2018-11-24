window.onload = ()=> {
    appDashBoardFunctions.checkLocalStorage();
    appDashBoardFunctions.generateMembersTable();
}

let appDashBoardFunctions = (()=> {   
    
    let membersArray = [
        {name: 'Wayne Rooney', company: 'Manchester United', status: 'closed', lastUpdated: '7/07/2017', notes:'Highest scorer', key:'12'},
        {name: 'David Beckham', company: 'Manchester United', status: 'closed', lastUpdated: '3/08/2003', notes:'Most stylish player', key:'32'},
        {name: 'Ryan Giggs', company: 'Manchester United', status: 'closed', lastUpdated: '3/08/2011', notes:'Most matches played', key:''},
        {name: 'Paul Pogba', company: 'Manchester United', status: 'Active', lastUpdated: '3/08/2011', notes:'United\'s most expensive', key:'34'},
        {name: 'Zlatan Ibrahimovic', company: 'LA Galaxy', status: 'Active', lastUpdated: '3/09/2018', notes:'I am \'ZLATAN\' ', key:'9'},

    ];

    const checkLocalStorage = ()=> {
        if (localStorage.getItem("members") === null) {
            localStorage.setItem("members", JSON.stringify(membersArray))
        }
    };

    const closeModal = ()=> {
        document.getElementById('addMemberPopup').classList.remove('open');
    };

     const toggleSelectAll = (ele)=> {
        let checkbox;
        if(ele.id == 'selectAllChkbox'){
            checkbox = document.querySelectorAll('.chkbox');
        } else if(ele.id == 'dropdownAll') {
            checkbox = document.querySelectorAll('.drpDwnChkbox');
        }
        
        let checkedBoxes = [];
        checkbox.forEach((item)=>{
            if(item !== ele) {
                item.checked = ele.checked;
                if(ele.checked==true) checkedBoxes.push(ele.checked)
            }
       });

       if(ele.id == 'dropdownAll') document.getElementById('counter').innerHTML = checkedBoxes.length;
    };

    const toggleDropdown=()=>{
        let ddId = document.getElementById('dropdown-list');
        ddId.classList.toggle('hidden'); 
        generateDropdownList();
        document.getElementById('counter').innerHTML = '0';
    };

    const checkSelected = (ele) => {
      let checkBox;

      if(ele.classList[0] == 'chkbox'){
        checkBox = document.querySelectorAll('.chkbox');
      }else if(ele.classList[0] == 'drpDwnChkbox'){
        checkBox = document.querySelectorAll('.drpDwnChkbox');
      }
      
      let checkedBoxes = [];
      for(var i=1; i<checkBox.length; i++){
        if(checkBox[i].checked) checkedBoxes.push(checkBox[i])
      }

       if((checkedBoxes.length+1) == checkBox.length) checkBox[0].checked = true;

       else if(checkBox[0].checked == true && (checkedBoxes.length+1) !== checkBox.length) checkBox[0].checked = false;

       
       if(ele.classList[0] == 'drpDwnChkbox') document.getElementById('counter').innerHTML = checkedBoxes.length;
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

    const alphabeticalSort = (ele)=> {
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
            <div class="div-table-col"><input type="checkbox" class="chkbox" name="" id="selectAllChkbox" onchange="appDashBoardFunctions.toggleSelectAll(this)"></div>
            <div class="div-table-col" onclick="appDashBoardFunctions.alphabeticalSort(this)" style="cursor:pointer">Name</div>
            <div class="div-table-col">Company</div>
            <div class="div-table-col">Status</div>
            <div class="div-table-col">Last Updated</div>
            <div class="div-table-col">Notes</div>
            <div class="div-table-col"></div>
         </div>`;

          
          items.map((ele)=>{
              tableHtml += `
              <div class="div-table-row check">
                <div class="div-table-col "><input type="checkbox" class="chkbox" onchange="appDashBoardFunctions.checkSelected(this)"></div>
                <div class="div-table-col">${ele.name}</div>
                <div class="div-table-col">${ele.company}</div>
                <div class="div-table-col">${ele.status}</div>
                <div class="div-table-col">${ele.lastUpdated}</div>
                <div class="div-table-col">${ele.notes}</div>
                <div class="div-table-col" onclick="appDashBoardFunctions.deleteRow(this)" id="${ele.key}"><i class="material-icons">delete</i></div>
             </div>              
              `
          });
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
            <h3 class="modal-header flex-start">Add members</h3>
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
      </div>`;
        modal.innerHTML = '';
        modal.innerHTML = modalHtml;
    };

    const generateDropdownList = ()=>{
        let ddList = document.getElementById('dropdown-list');
        let items = JSON.parse(localStorage.getItem("members"));
        let dropdownHtml = '';
        dropdownHtml += '<li><input type="checkbox" class="drpDwnChkbox" id="dropdownAll" onchange="appDashBoardFunctions.toggleSelectAll(this)">Select all</li>';
        items.map((ele)=>{
            dropdownHtml += `
            <li><input type="checkbox" class="drpDwnChkbox" onchange="appDashBoardFunctions.checkSelected(this)">${ele.company}</li>`;
        });
        ddList.innerHTML = '';
        ddList.innerHTML = dropdownHtml;
    }


    //reveal functions
    const returnObject = {
        openModal: openModal,
        closeModal: closeModal,
        toggleSelectAll: toggleSelectAll,
        toggleDropdown: toggleDropdown,
        deleteRow: deleteRow,
        saveItems: saveItems,
        generateMembersTable: generateMembersTable,
        checkLocalStorage: checkLocalStorage,
        alphabeticalSort: alphabeticalSort,
        checkSelected: checkSelected,
        generateDropdownList: generateDropdownList
    }

   return returnObject;

})();


document.getElementById('addMembers').addEventListener('click', function() {
    appDashBoardFunctions.openModal();
});

let homePanel = document.getElementById('homePanel');
let teamPanel = document.getElementById('teamPanel');
let analyticsPanel = document.getElementById('analyticsPanel');
let settingsPanel = document.getElementById('settingsPanel');

homePanel.addEventListener('click', function(){
    document.getElementById('panelHeader').innerText = 'Home';
    document.getElementById('memberForm').style.display = 'none';
    document.getElementById('addMembers').style.display = 'none';
    homePanel.classList.add('active');
    teamPanel.classList.remove('active');
    analyticsPanel.classList.remove('active');
    settingsPanel.classList.remove('active'); 
})

document.getElementById('teamPanel').addEventListener('click', function(){
    appDashBoardFunctions.generateMembersTable();
    document.getElementById('panelHeader').innerText = 'Team Members';
    document.getElementById('memberForm').style.display = 'block';
    document.getElementById('addMembers').style.display = '';
    homePanel.classList.remove('active');
    teamPanel.classList.add('active');
    analyticsPanel.classList.remove('active');
    settingsPanel.classList.remove('active');
})

document.getElementById('analyticsPanel').addEventListener('click', function(){
    document.getElementById('panelHeader').innerText = 'Analytics';
    document.getElementById('memberForm').style.display = 'none';
    document.getElementById('addMembers').style.display = 'none';
    homePanel.classList.remove('active');
    teamPanel.classList.remove('active');
    analyticsPanel.classList.add('active');
    settingsPanel.classList.remove('active');
})

document.getElementById('settingsPanel').addEventListener('click', function(){
    document.getElementById('panelHeader').innerText = 'Settings';
    document.getElementById('memberForm').style.display = 'none';
    document.getElementById('addMembers').style.display = 'none';
    homePanel.classList.remove('active');
    teamPanel.classList.remove('active');
    analyticsPanel.classList.remove('active');
    settingsPanel.classList.add('active');
})



