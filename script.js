document.addEventListener('DOMContentLoaded', () => {
    const entryYearInput = document.getElementById('entryYear');
    const nicknameInput = document.getElementById('nickname');
    const positionSelect = document.getElementById('position');
    const generateBtn = document.getElementById('generateBtn');
    const outputDiv = document.getElementById('output');
    const copyBtn = document.getElementById('copyBtn');
    const errorMessageDiv = document.getElementById('errorMessage');

    // ดึงข้อมูลตำแหน่งจากไฟล์ JSON และสร้างตัวเลือกใน dropdown
    fetch('roles.json')
        .then(response => response.json())
        .then(roles => {
            roles.forEach(role => {
                const option = document.createElement('option');
                option.value = role;
                option.textContent = role;
                positionSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching roles:', error);
        });

    generateBtn.addEventListener('click', () => {
        const entryYear = parseInt(entryYearInput.value);
        const nickname = nicknameInput.value.trim();
        const position = positionSelect.value;
        
        // ซ่อนข้อความแจ้งเตือนเมื่อผู้ใช้กดสร้างใหม่
        errorMessageDiv.style.display = 'none';
        
        if (entryYear && nickname) {
            // คำนวณเลขรุ่นที่ถูกต้อง
            const modelNumber = entryYear - 2550;
            let generatedName = "";

            if (position === "ไม่มีตำแหน่ง") {
                generatedName = `CE${modelNumber} ${nickname}[]`;
            } else {
                generatedName = `CE${modelNumber} ${nickname}[${position}]`;
            }
            
            outputDiv.textContent = generatedName;
            outputDiv.style.display = 'block';
            copyBtn.style.display = 'block';
        } else {
            errorMessageDiv.textContent = 'กรุณากรอกข้อมูล ปีที่เข้าศึกษา และ ชื่อเล่น ให้ครบถ้วน';
            errorMessageDiv.style.display = 'block';
            outputDiv.style.display = 'none';
            copyBtn.style.display = 'none';
        }
    });

    copyBtn.addEventListener('click', () => {
        const textToCopy = outputDiv.textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
            copyBtn.textContent = 'คัดลอกแล้ว!';
            setTimeout(() => {
                copyBtn.textContent = 'คัดลอก';
            }, 2000);
        }).catch(err => {
            console.error('ไม่สามารถคัดลอกได้:', err);
            // แสดงข้อความแจ้งเตือนเมื่อคัดลอกไม่สำเร็จ
            errorMessageDiv.textContent = 'ไม่สามารถคัดลอกข้อความได้ โปรดลองคัดลอกด้วยตนเอง';
            errorMessageDiv.style.display = 'block';
        });
    });
});