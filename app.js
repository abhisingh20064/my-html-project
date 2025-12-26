// app.js
function login(){
    const role =
    document.getElementById('role').value;

    //firebase k liye jagah
    if (role === 'admin') {
        window.location.href = 
        'admin-dashboard.html';
    }else if (role === 'member') {
        window.location.href =
        'member-dashboard.html';
    } else {
        window.location.href =
        'user-dashboard.html';
    }
    }
    //global demo array (actual project me yehi data firebase me jayega )
    const demoMembers= [
        {
            id: 1,
            name:'Abhishek  Singh',
            age:'19',
            phone:'9876543210',
            email:'abhishek@emaple.com',
            join:'01/01/2026',
            plan:'monthly',
            fee:'500',
            status:'active',
            address:'delhi'
        },
        {
            id: 2,
            name:'Rahul Singh',
            age:'20',
            phone:'9876543334',
            email:'rahul@emaple.com',
            join:'01/02/2026',
            plan:'quarterly',
            fee:'1300',
            status:'active',
            address:'mumbai'
        },
        {
            id: 3,
            name:'Janak nandani Singh',
            age:'18',
            phone:'8127543210',
            email:'janaknandani@emaple.com',
            join:'10/01/2026',
            plan:'yearly',
            fee:'5500',
            status:'active',
            address:'gorakhpur uttar pradesh'
        }
    ];
    function loadPackageMembers(){
        const select = 
        document.getElementById('p_member');
        if (!select)return;

        select.innerHTML='<option value="">Select member</option>';

        demoMembers.forEach(m=> {
            const opt=
            document.createElement('option');
            opt.value=m.id;
            opt.textContent=`${m.name} (${m.phone})`;
            select.appendChild(opt);
        });
    }
    //member-bills //

    function assignPackage() {

        const memberId = 
        document.getElementById('p_member').value;
        const plan=
        document.getElementById('p_plan').value;
        const amount =
        document.getElementById('p_amount').value.trim();
        const msg =
        document.getElementById('p_msg');
        if (!memberId || !plan|| !amount) {
            msg.style.color='#ef4444';
            msg.textContent='Please select member, plan and amount.';
            return;
        }
        const member=demoMembers.find(m=> m.id==memberId);
        if (!member){
            msg.style.color='#ef4444';
            msg.textContent='Member not found (demo).';
            return;
        }
        member.plan=plan;
        member.fee=amount;
        console.log('Upadte member:',member);
        msg.style.color='#22c55e';
        msg.textContent='Fee package assigned (demo only).';
    }
    function renderBillsOnCreatePage(){
            const tbody =
            document.getElementById('billListBody');
            if(!tbody) return;
            const loggedMemberId = 1;
            const myBills = demoBills.filter(b=>b.memberId==loggedMemberId);

            tbody.innerHTML='';
            myBills.forEach(bill=>{
                const member = demoMembers.find(m=> m.id==bill.memberId);
                const memberName = member?
                member.name:'Unknown';

                const tr = 
                document.createElement('tr');
                tr.innerHTML=`
                <td>${memberName}</td>
                <td>${bill.amount}</td>
                <td>${bill.due}</td>
                <td>${bill.status}</td>
                `;
                tbody.appendChild(tr);
            });
        }

    function saveMember(){
        console.log('saveMember called');
    
        const name =
        document.getElementById('m_name').value.trim();
        const age =
        document.getElementById('m_age').value.trim();
         const phone =
        document.getElementById('m_phone').value.trim();
        const email =
        document.getElementById('m_email').value.trim();
         const join =
        document.getElementById('m_join').value;
        const plan =
        document.getElementById('m_plan').value;
         const fee =
        document.getElementById('m_fee').value.trim();
        const status =
        document.getElementById('m_status').value;
         const address =
        document.getElementById('m_address').value.trim();
        const msg =
        document.getElementById('msg');

        if (!name || !phone || !join || !fee){
            msg.style.color = '#f97316';
            msg.textContent = 'Please fill all required fields.';
            return;
        }
        const member = {
            id: Date.now(),
            name,
            age,
            phone,
            email,
            join,
            plan,
            fee,
            status,
            address
        };
        demoMembers.push(member);
        console.log('Members list:',demoMembers);

        msg.style.color = '#22c55e';
        msg.textContent = 'Member saved (demo only,not in database).';
        
        document.querySelector('.member-form').reset();

    }
    //manage-member.html
    function renderMembers() {
        const tbody = 
        document .getElementById('memberBody');
        const search = 
        document .getElementById('searchText')
        ?
        document .getElementById('searchText').
        value.toLowerCase()
        :'';
        if (!tbody)return;
        tbody.innerHTML = '';
        const filtered = 
        demoMembers.filter(m =>
            m.name.toLowerCase().includes(search)
            ||
            m.phone.includes(search)
        );
        filtered.forEach(member => {
            const tr =
            document.createElement('tr');

            tr.innerHTML = `
            <td>${member.name}</td>
            <td>${member.phone}</td>
            <td>${member.plan}</td>
            <td>${member.fee}</td>
            <td>${member.status}</td>
            <td>
                <button class="action-btn btn-edit" onclick="editMember (${member.id})">Edit</button>
                <button class="action-btn btn-delete" onclick="deleteMember(${member.id})">Delete</button>
                </td>
                `;
                tbody.appendChild(tr);
        });

        const msg = 
        document.getElementById('manageMsg');
        if (msg) {
            msg.textContent = filtered.length===0 ? 'no members found (demo data).':'';
        }
    }

    //delete//
    function deleteMember(id) {
        const index = 
        demoMembers.findIndex(m => m.id ===id);
        if (index !== -1){
            demoMembers.splice(index, 1);
            renderMembers();
        }
    }

    //edit//

    function editMember(id) {
        const member= demoMembers.find(m=> m.id===id);
        if (!member)return;

        const newName = prompt('update name:', member.name);
        if (newName !==null &&
            newName.trim() !== '') {
                member.name = newName.trim();
            }
            const newPhone = prompt('Update phone:', member.phone);
            if (newPhone !==null &&
                newPhone.trim() !=='') {
                    member.phone = newPhone.trim();
                }
                renderMembers();
    }
    //page load//

    window.addEventListener('DOMContentLoaded', () => {
        if
        (document.getElementById('memberBody')
    ) {
        renderMembers();
    }
    });
    // bill demo//

    let demoBills  = [];
    const savedBills=
    localStorage.getItem('demoBills');
    if (savedBills) {
        demoBills=JSON.parse(savedBills);
    }
    function loadBillMembers() {
        const select = 
        document.getElementById('b_member');
        console.log('loadBillMembers called', select, demoMembers);
        if (!select) return;

        select.innerHTML ='<option value="">Select member</option>';

        demoMembers.forEach(m=> {
            const opt=
            document.createElement('option');
            opt.value = m.id;
            opt.textContent=`${m.name} (${m.phone})`;
            select.appendChild(opt);
        });
    }
    function createBill(){
        const memberId =
        document.getElementById('b_member').value;
        const pkg=
        document.getElementById('b_plan').value;
        const amount =
        document.getElementById('b_amount').value.trim();
        const due=
        document.getElementById('b_due').value;
        const status=
        document.getElementById('b_status').value;
        const  msg=
        document.getElementById('b_msg');
        
        if (!memberId || !amount || !due ){
            msg.style.color = '#f97316';
            msg.textContent='Please fill all required  fields.';
            return;
        }
        const bill={
            memberId:Number(memberId),
            pkg:pkg,
            amount:amount,
            due:due,
            status:status,
            created:new
            Date().toISOString().slice(0, 10)
        };
        demoBills.push(bill);
        localStorage.setItem('demoBills', JSON.stringify(demoBills));
        renderBillsOnCreatePage();

        msg.style.color='#22c55e';
        msg.textContent='Bill created (demo only).';

        document.querySelector('.member-form')
        .reset();
        loadBillMembers();
    }
    
    // notification demo //

    let demoNotifications = [];
    const savedNoti =
    localStorage.getItem('demoNotifications');
    if (savedNoti) {
        demoNotifications = 
        JSON.parse(savedNoti);
    }
    function loadNotifyMembers() {
        const select =
        document.getElementById('n_member');
        if (!select) return;

        select.innerHTML = '<option value="">Select member</option>';
        demoMembers.forEach(m=> {
            const opt = 
            document.createElement('option');
            opt.value=m.id;
            opt.textContent = `${m.name} (${m.phone})`;
            select.appendChild(opt);
        });
    }

    function createNotification() {
        const memberId = 
        document.getElementById('n_member').value;
        const title =
        document.getElementById('n_title').value.trim();
        const message =
        document.getElementById('n_message').value.trim();
        const msgBox =
        document.getElementById('n_msg');

        if (!member|| !title ||!message){
            msgBox.style.color = '#f97316';
            msgBox.textContent = 'please fill all  fields.';
            return;
        }
        const noti = {
            memberId: Number(memberId),
            title:title,
            message:message,
            created:new
            Date().toDateString().slice(0, 10)
        };
        demoNotifications.push(noti);

        localStorage.setItem('demoNotifications',
            JSON.stringify(demoNotifications));
            msgBox.style.color = '#22c55e';
            msgBox.textContent = 'Notification sent (demo only).';
            renderNotificationsAdmin();

            document.querySelector('.member-form') .reset();
            loadNotifyMembers();
    }
    function renderNotificationsAdmin() {
        const tbody =
        document.getElementById('notifyListBody');
        if (!tbody) return;

        tbody.innerHTML='';
        demoNotifications.slice().reverse().forEach(n=> {
            const member = demoMembers.find(m=>m.id==n.memberId);
            const memberName = member ?
            member.name : 'Unknown';

            const tr = 
            document.createElement('tr');
            tr.innerHTML = `
            <td>${memberName}</td>
            <td>${n.title}</td>
            <td>${n.message}</td>
            <td>${n.created}<td>
            `;
            tbody.appendChild(tr);
        });
    }
    function renderMemberNotifications(){
        const tbody = 
        document.getElementById('memberNotifyBody');
        if (!tbody) return;
        
        const loggedMemberId = 1;
        const myNoti =
        demoNotifications.filter(n => n.memberId== loggedMemberId);

        tbody.innerHTML ='';
        myNoti.slice().reverse().forEach(n=>{
            const tr = 
            document.createElement('tr');
            tr.innerHTML=`
            <td>${n.title}</td>
            <td>${n.message}</td>
            <td>${n.created}</td>
            `;
            tbody.appendChild(tr);
        });
    }

    window.addEventListener('DOMContentLoaded',() => {
        if
        (document.getElementById('memberBody') ) {
            renderMembers();
        }
        if
        (document.getElementById('b_member'))
        {
            loadBillMembers();
        }
        if
        (document.getElementById('memberBillBody')){
            renderMembersBills();
        }
        if
        (document.getElementById('p_member'))
        {
            loadPackageMembers();
        }
        if
        (document.getElementById('billListBody')) {
            renderBillsOnCreatePage();
        }
        if
        (document.getElementById('n_member'))
        {
            loadNotifyMembers();
            renderNotificationsAdmin();
        }
        if
        (document.getElementById('notifyListBody')){
            renderNotificationsAdmin();
        }
        if
        (document.getElementById('memberNotifyBody')) {
            renderMemberNotifications();
        }
    });
