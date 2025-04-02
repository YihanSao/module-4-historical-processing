document.addEventListener('DOMContentLoaded', () => {
    const jobForm = document.getElementById('jobForm');
    const showDataButton = document.getElementById('showDataButton');
    const dataDisplay = document.getElementById('dataDisplay');
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
});