window.onload = ()=> {
    appDashBoardFunctions.checkLocalStorage();
    appDashBoardFunctions.generateMembersTable();
};

let appDashBoardFunctions = (()=> {   

    let sortOrder = true;
    
    let membersArray = [
        {name: 'David Beckham', company: 'Manchester United', status: 'Closed', lastUpdated: '3/08/2003', notes:'Most stylish player', key:'32'},
        {name: 'Wayne Rooney', company: 'DC United', status: 'Active', lastUpdated: '7/07/2017', notes:'ManUtd Highest scorer', key:'12'},
        {name: 'Ryan Giggs', company: 'Manchester United', status: 'Closed', lastUpdated: '3/08/2011', notes:'Most matches played', key:'24'},
        {name: 'Zlatan Ibrahimovic', company: 'LA Galaxy', status: 'Active', lastUpdated: '3/09/2018', notes:'I am \'ZLATAN\' ', key:'9'},
    ];

    const checkLocalStorage = ()=> {
        if (localStorage.getItem("members") === null) {
            localStorage.setItem("members", JSON.stringify(membersArray));
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
                if(ele.checked==true) checkedBoxes.push(ele.checked);
            }
       });
       if(ele.id == 'dropdownAll') document.getElementById('counter').innerHTML = checkedBoxes.length;
    };

    const toggleDropdown=(ele)=>{
        let ddId;

        if(ele.id == 'dropdownCheckbox') ddId = document.getElementById('dropdown-list-comp');
        else ddId = document.getElementById('dropdown-list-status');

        ddId.classList.toggle('hidden'); 
        generateDropdownList(ddId);
        generateMembersTable();
        document.getElementById('counter').innerHTML = '0';

        if(ele.lastElementChild.innerText == "keyboard_arrow_down") ele.lastElementChild.innerText = "keyboard_arrow_up";
        else ele.lastElementChild.innerText = "keyboard_arrow_down";

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
        if(checkBox[i].checked) checkedBoxes.push(checkBox[i]);
      }

       if((checkedBoxes.length+1) == checkBox.length) checkBox[0].checked = true;
       else if(checkBox[0].checked == true && (checkedBoxes.length+1) !== checkBox.length) checkBox[0].checked = false;
       
       if(ele.classList[0] == 'drpDwnChkbox') document.getElementById('counter').innerHTML = checkedBoxes.length;
    };

    const checkSingle = (ele)=> {
       let text = ele.parentElement.innerText;
       let checkBox = document.querySelectorAll('.statusList');
       checkBox.forEach((item) => {
        if (item !== ele) item.checked = false;
        else if(ele.checked === false) generateMembersTable();
      });

      if(ele.checked) filterStatus(text);
    };

    const deleteRow = (ele) => {
        ele.parentElement.remove();
        let items = JSON.parse(localStorage.getItem("members"));
        let index = items.findIndex(function(el){
            return el.key === ele.id;
        });
        if (index !== -1) items.splice(index, 1);

        let newItems = items;
        newItems = JSON.stringify(newItems);
        localStorage.setItem("members", newItems);
    };

    const alphabeticalSort = ()=> {
        let items = JSON.parse(localStorage.getItem("members"));
        let sortedArray = items.sort((a, b)=>{
            let x = a.name.toLowerCase();
            let y = b.name.toLowerCase();
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
        });
       // items = JSON.stringify(sortedArray);
       // localStorage.setItem("members", items);
       // generateMembersTable(sortedArray);  
       sortOrder = false;
       return sortedArray;
    };

    const alphabeticalSortDesc = ()=> {
        sortOrder = true;
        return alphabeticalSort().reverse();
    };

    const toggleSort = (ele)=> {
         let sortedArray;
         let icon;
         if(sortOrder){
            sortedArray = alphabeticalSort();
            icon = 'arrow_upward';
         }else {
            sortedArray = alphabeticalSortDesc();
            icon = 'arrow_downward';
         }
         generateMembersTable(sortedArray,icon);
    };

    const saveItems = ()=> {
        let getcurrentDate = new Date();
        let dd = getcurrentDate.getMonth()+1;
        let mm = getcurrentDate.getDate();
        let yyyy = getcurrentDate.getFullYear();
        let currentDate = dd + '/' + mm + '/' + yyyy;

        let validityCounter = 0;

        document.querySelectorAll('.memberform').forEach((ele)=>{
            if(ele.checkValidity()===true) validityCounter++;
        });

        if(validityCounter === 4){
            let saveObject = {
                name: document.getElementById('memberName').value, 
                company: document.getElementById('memberCompany').value, 
                status: document.getElementById('memberStatus').value, 
                lastUpdated: currentDate, 
                notes:document.getElementById('memberNotes').value,
                key:(new Date().getTime()).toString(36)
            };

            membersArray.push(saveObject);
            localStorage.setItem("members", JSON.stringify(membersArray));
            closeModal();
            generateMembersTable();
            validityCounter = 0;
        } else  document.getElementById('modal-error-text').style.display='block';

   
    };

    const generateMembersTable = (arr,icon)=> {
          let tableId = document.getElementById('div-table');  
          let formId = document.getElementById('memberForm');
          let items = arr!==undefined ? arr:JSON.parse(localStorage.getItem("members"));
          let arrow = icon!==undefined ? icon:null;

          let tableHtml = '';
          tableHtml += `
          <div class="div-table-row header">
            <div class="div-table-col"><input type="checkbox" class="chkbox" name="" id="selectAllChkbox" onchange="appDashBoardFunctions.toggleSelectAll(this)"></div>
            <div class="div-table-col" onclick="appDashBoardFunctions.toggleSort(this)" style="cursor:pointer">Name<i class="material-icons">${arrow}</i></div>
            <div class="div-table-col">Company</div>
            <div class="div-table-col">Status</div>
            <div class="div-table-col">Last Updated</div>
            <div class="div-table-col">Notes</div>
            <div class="div-table-col"></div>
         </div>`;          
          items.map((ele)=>{
              tableHtml += `
              <div class="div-table-row check" data-status="${ele.status}">
                <div class="div-table-col "><input type="checkbox" class="chkbox" onchange="appDashBoardFunctions.checkSelected(this)"></div>
                <div class="div-table-col">${ele.name}</div>
                <div class="div-table-col">${ele.company}</div>
                <div class="div-table-col">${ele.status}</div>
                <div class="div-table-col">${ele.lastUpdated}</div>
                <div class="div-table-col">${ele.notes}</div>
                <div class="div-table-col" onclick="appDashBoardFunctions.deleteRow(this)" id="${ele.key}"><i class="material-icons">delete</i></div>
             </div>`;
          });
          tableId.innerHTML = '';
          tableId.innerHTML = tableHtml;

          if(formId.scrollHeight>formId.clientHeight) formId.style.margin='0 6.5px';          
    };
  
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

    const generateDropdownList = (list)=>{
        let items = JSON.parse(localStorage.getItem("members"));
        let status = items.map((ele)=>{
            return ele.status;
        });
        status = [...new Set(status)];

        let dropdownHtml = '';
       if(list.id === 'dropdown-list-comp') {
        dropdownHtml += '<li><input type="checkbox" class="drpDwnChkbox" id="dropdownAll" onchange="appDashBoardFunctions.toggleSelectAll(this)">Select all</li>';
        items.map((ele)=>{          
            dropdownHtml += `
            <li><input type="checkbox" class="drpDwnChkbox" onchange="appDashBoardFunctions.checkSelected(this)">${ele.company}</li>`;
        });
       } else{
        status.map((ele)=>{          
            dropdownHtml += `<li><input type="checkbox" class="statusList" onchange="appDashBoardFunctions.checkSingle(this)">${ele}</li>`;
        });
       }
        list.innerHTML = '';
        list.innerHTML = dropdownHtml;

       if(list.id === 'dropdown-list-comp'){
        document.getElementById('dropdown-list-status').classList.add('hidden');
     //   if(document.getElementById('dropdownCheckbox').lastElementChild.innerText == "keyboard_arrow_down") document.getElementById('dropdownCheckbox').lastElementChild.innerText = "keyboard_arrow_up";
       } 
       else {
        document.getElementById('dropdown-list-comp').classList.add('hidden');
        // document.getElementById('dropdownStatus').lastElementChild.innerText = "keyboard_arrow_up";
       // if(document.getElementById('dropdownStatus').lastElementChild.innerText == "keyboard_arrow_down") document.getElementById('dropdownStatus').lastElementChild.innerText = "keyboard_arrow_up";
       }

    };

    const filterStatus = (word)=> {
        let listItems = document.querySelectorAll('.check');
        for (let i = 0; i < listItems.length; i++) {
            let listText = document.querySelectorAll('.check')[i].getAttribute('data-status');
            if (listText.toLowerCase().match(word.toLowerCase())) {          
                listItems[i].classList.remove('hidden');
            } else {
                listItems[i].classList.add('hidden');
            }
        }
    };

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
        alphabeticalSortDesc: alphabeticalSortDesc,
        toggleSort: toggleSort,
        checkSelected: checkSelected,
        checkSingle: checkSingle,
        generateDropdownList: generateDropdownList,
        filterStatus: filterStatus
    };

   return returnObject;

})();


document.getElementById('addMembers').addEventListener('click', ()=> {
    appDashBoardFunctions.openModal();
});

let homePanel = document.getElementById('homePanel');
let teamPanel = document.getElementById('teamPanel');
let analyticsPanel = document.getElementById('analyticsPanel');
let settingsPanel = document.getElementById('settingsPanel');

homePanel.addEventListener('click', ()=>{
    document.getElementById('panelHeader').innerText = 'Home';
    document.getElementById('memberForm').style.display = 'none';
    document.getElementById('addMembers').style.display = 'none';
    document.getElementById('dropdownCheckbox').style.display = 'none';
    document.getElementById('dropdownStatus').style.display = 'none';
    homePanel.classList.add('active');
    teamPanel.classList.remove('active');
    analyticsPanel.classList.remove('active');
    settingsPanel.classList.remove('active'); 
});

document.getElementById('teamPanel').addEventListener('click', ()=>{
    appDashBoardFunctions.generateMembersTable();
    document.getElementById('panelHeader').innerText = 'Team Members';
    document.getElementById('memberForm').style.display = 'block';
    document.getElementById('addMembers').style.display = '';
    document.getElementById('dropdownCheckbox').style.display = '';
    document.getElementById('dropdownStatus').style.display = '';
    homePanel.classList.remove('active');
    teamPanel.classList.add('active');
    analyticsPanel.classList.remove('active');
    settingsPanel.classList.remove('active');
});

document.getElementById('analyticsPanel').addEventListener('click', ()=>{
    document.getElementById('panelHeader').innerText = 'Analytics';
    document.getElementById('memberForm').style.display = 'none';
    document.getElementById('addMembers').style.display = 'none';
    document.getElementById('dropdownCheckbox').style.display = 'none';
    document.getElementById('dropdownStatus').style.display = 'none';
    homePanel.classList.remove('active');
    teamPanel.classList.remove('active');
    analyticsPanel.classList.add('active');
    settingsPanel.classList.remove('active');
});

document.getElementById('settingsPanel').addEventListener('click', ()=>{
    document.getElementById('panelHeader').innerText = 'Settings';
    document.getElementById('memberForm').style.display = 'none';
    document.getElementById('addMembers').style.display = 'none';
    document.getElementById('dropdownCheckbox').style.display = 'none';
    document.getElementById('dropdownStatus').style.display = 'none';
    homePanel.classList.remove('active');
    teamPanel.classList.remove('active');
    analyticsPanel.classList.remove('active');
    settingsPanel.classList.add('active');
});



