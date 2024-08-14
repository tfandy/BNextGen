document.addEventListener('DOMContentLoaded', function() {
    // Function to switch from page 1 to page 2
    function showPage2() {
        document.querySelector('.page1').style.display = 'none';
        document.querySelector('.page2').style.display = 'flex';
    }

    // Function to display the registration form
    function showForm() {
        document.querySelector('.register-box').style.display = 'none';
        document.querySelector('.form-container').style.display = 'block';
    }

    // Function to toggle additional fields based on job status selection
    function toggleJobFields() {
        const jobStatus = document.getElementById('jobStatus').value;
        document.getElementById('studentFields').style.display = jobStatus === 'PEL' ? 'block' : 'none';
        document.getElementById('workFields').style.display = jobStatus === 'BEKERJA' ? 'block' : 'none';
    }

    // Function to submit the form and download data as CSV
    function submitForm() {
        const form = document.getElementById('registrationForm');
        const formData = new FormData(form);
        const data = {};

        formData.forEach((value, key) => {
            data[key] = value;
        });

        const json = JSON.stringify(data);
        downloadExcel(json);
    }

    // Function to download the form data as a CSV file
    function downloadExcel(jsonData) {
        const data = JSON.parse(jsonData);
        let csv = '';

        for (const key in data) {
            if (csv !== '') csv += ',';
            csv += key;
        }
        csv += '\n';

        for (const key in data) {
            if (csv !== '') csv += ',';
            csv += data[key];
        }
        csv += '\n';

        const hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        hiddenElement.target = '_blank';
        hiddenElement.download = 'registration_data.csv';
        hiddenElement.click();
    }

    // Event listeners
    document.querySelector('.page1').addEventListener('click', showPage2);
    document.querySelector('.register-box').addEventListener('click', showForm);
    document.getElementById('jobStatus').addEventListener('change', toggleJobFields);
    document.querySelector('button').addEventListener('click', submitForm);
});
