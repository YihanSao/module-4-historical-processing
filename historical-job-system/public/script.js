document.addEventListener('DOMContentLoaded', () => {
    const jobForm = document.getElementById('jobForm');
    const showDataButton = document.getElementById('showDataButton');
    const dataDisplay = document.getElementById('dataDisplay');
    const deleteButton = document.getElementById('deleteButton');
    const updateButton = document.getElementById('updateButton');

    jobForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const jobData = {
            claimNumber: document.getElementById('claimNumber').value,
            policyNumber: document.getElementById('policyNumber').value,
            lossDate: document.getElementById('lossDate').value,
            insured: {
                name: document.getElementById('insuredName').value,
                address: {
                    street: document.getElementById('street').value,
                    city: document.getElementById('city').value,
                    state: document.getElementById('state').value,
                    zip: document.getElementById('zip').value,
                },
            },
            estimate: {
                lineItems: [
                    {
                        code: document.getElementById('code').value,
                        description: document.getElementById('description').value,
                        quantity: parseFloat(document.getElementById('quantity').value),
                        uom: document.getElementById('uom').value,
                        unitPrice: parseFloat(document.getElementById('unitPrice').value),
                        extension: parseFloat(document.getElementById('extension').value),
                        categoryCode: document.getElementById('categoryCode').value,
                    },
                ],
            },
        };

        try {
            const response = await fetch('/api/xactanalysis/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jobData),
            });
            const check=await fetch('/api/claims', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jobData),
            });
            if(check.ok){
                const result = await check.json();
                alert('Job data sent successfully: ' + JSON.stringify(result));
            }
            else{
                alert('Error sending job data: ' + error.message);
            }
          
            if (response.ok) {
                const result = await response.json();
                alert('Job data sent successfully: ' + JSON.stringify(result));
            } else {
                const error = await response.json();
                alert('Error sending job data: ' + error.message);
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });
     // Delete 功能
     deleteButton.addEventListener('click', async () => {
        const claimNumber = document.getElementById('deleteClaimNumber').value;

        if (!claimNumber) {
            alert('Please enter a Claim Number to delete.');
            return;
        }

        try {
            const response = await fetch(`/api/claims/${claimNumber}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert(`Claim with Claim Number ${claimNumber} deleted successfully.`);
            } else {
                const error = await response.text();
                alert('Error deleting claim: ' + error);
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });

    updateButton.addEventListener('click', async () => {
        const claimNumber = document.getElementById('updateClaimNumber').value;
    
        if (!claimNumber) {
            alert('Please enter a Claim Number to update.');
            return;
        }
    
        // 获取用户输入的更新数据
        const updatedData = {
            policyNumber: document.getElementById('updatePolicyNumber').value || undefined,
            lossDate: document.getElementById('updateLossDate').value || undefined,
        };
    
        // 移除未填写的字段
        if (!updatedData.policyNumber) delete updatedData.policyNumber;
        if (!updatedData.lossDate) delete updatedData.lossDate;
    
        try {
            const response = await fetch(`/api/claims/${claimNumber}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });
    
            if (response.ok) {
                const result = await response.json();
                alert(`Claim with Claim Number ${claimNumber} updated successfully: ` + JSON.stringify(result));
            } else {
                const error = await response.text();
                alert('Error updating claim: ' + error);
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });
    // 点击 "Show All Data" 按钮，获取所有数据
    showDataButton.addEventListener('click', async () => {
        
        try {
            
            const response = await fetch('/api/claims', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
        

               
                const rawResponse = await response.text();
                 // 清空之前的显示内容
                 dataDisplay.innerHTML = '';
                 dataDisplay.innerHTML=rawResponse;
                 // 将响应数据展示在页面上

                //alert('Response Data: ' + rawResponse);
   
            } else {
                console.error('Error fetching data');
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    });
});