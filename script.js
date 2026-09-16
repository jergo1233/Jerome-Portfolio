
        const apiKey = ""; // Set by runtime

        // Initialize EmailJS with your Public Key
 (function() {
    emailjs.init("G53ZwIDjlU3kR__tl"); // Palitan ng nakuha mong Public Key
})();

async function sendMsg() {
    // 1. Client-side Honeypot Check (Kapag may tsek ang botCheck, hihinto agad)
    const botCheck = document.getElementById('botCheck');
    if (botCheck && botCheck.checked) {
        console.warn("Spam attempt detected.");
        return;
    }

    const nameField = document.getElementById('cName');
    const box = document.getElementById('cMsg');
    const btn = document.getElementById('sendBtn');

    // 2. Trimming para makaiwas sa mga blangkong spaces
    const name = nameField ? nameField.value.trim() : '';
    const message = box ? box.value.trim() : '';

    if (!message) {
        alert("Please enter a message.");
        return;
    }

    if (btn) {
        btn.disabled = true;
        btn.innerText = 'Sending...';
    }

    const templateParams = {
        from_name: name || 'Anonymous',
        to_email: 'jeromeurbano41@gmail.com',
        message: message,
        time: new Date().toLocaleString(),
        website_source: 'Jerome Urbano Portfolio' 
    };

    try {
        await emailjs.send('service_ao5o77t', 'template_2u2znhs', templateParams);
        alert('Email sent successfully!');
        if (box) box.value = '';
        if (nameField) nameField.value = '';
    } catch (error) {
        console.error('Failed to send email:', error);
        alert('Failed to send email. Please check your config or internet connection.');
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.innerText = 'Send';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('sendBtn');
    const box = document.getElementById('cMsg');

    if (btn && box) {
        btn.addEventListener('click', sendMsg);

        box.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                const start = box.selectionStart;
                const end = box.selectionEnd;
                const currentValue = box.value;

                box.value = currentValue.slice(0, start) + '\n' + currentValue.slice(end);
                box.selectionStart = box.selectionEnd = start + 1;
            }
        });
    }
});


        // Typing Effect
        const roles = ["Frontend Developer", "UI/UX Designer"];
        let roleIdx = 0, charIdx = 0, isDeleting = false;
        function type() {
            const currentRole = roles[roleIdx];
            const display = isDeleting ? currentRole.substring(0, charIdx--) : currentRole.substring(0, charIdx++);
            document.getElementById('typing-text').innerText = display;
            if(!isDeleting && charIdx === currentRole.length + 1) { isDeleting = true; setTimeout(type, 1500); }
            else if(isDeleting && charIdx === 0) { isDeleting = false; roleIdx = (roleIdx + 1) % roles.length; setTimeout(type, 500); }
            else { setTimeout(type, isDeleting ? 50 : 100); }
        }

        // UI Helpers
        window.addEventListener('scroll', () => {
            document.getElementById('header').classList.toggle('sticky', window.scrollY > 50);
            document.querySelector('.back-to-top').style.display = window.scrollY > 500 ? 'flex' : 'none';
            
            document.querySelectorAll('.reveal').forEach(el => {
                if(el.getBoundingClientRect().top < window.innerHeight - 100) el.classList.add('active');
            });
        });

        function toggleMenu() { document.getElementById('nav-links').classList.toggle('active'); }
        function closeMenu() { document.getElementById('nav-links').classList.remove('active'); }

        window.onload = type;

                const canvas = document.getElementById("bgCanvas");
        const ctx = canvas.getContext("2d");

        let particles = [];
        const particleCount = 25;

        /* resize handler */
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        
            // recreate particles so hindi sila "sira position"
            initParticles();
        }

        window.addEventListener("resize", resizeCanvas);

        /* particle class */
        class Particle {
            constructor() {
                this.reset();
            }
          
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
            
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
            
                this.radius = 2;
            }
          
            move() {
                this.x += this.vx;
                this.y += this.vy;
            
                // bounce edges
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
          
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            
                ctx.fillStyle = "rgba(0, 255, 255, 0.9)";
                ctx.shadowColor = "#00ffff";
                ctx.shadowBlur = 12;
                ctx.fill();
            }
        }

        /* init particles */
        function initParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        /* connect lines */
        function connect() {
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                
                    let dx = particles[a].x - particles[b].x;
                    let dy = particles[a].y - particles[b].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                
                    if (distance < 160) {
                        ctx.beginPath();
                        ctx.strokeStyle = "rgba(0, 255, 255, 0.12)";
                        ctx.shadowColor = "#00ffff";
                        ctx.shadowBlur = 8;
                        ctx.lineWidth = 1;
                    
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        /* animation loop */
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        
            for (let p of particles) {
                p.move();
                p.draw();
            }
          
            connect();
            requestAnimationFrame(animate);
        }

        /* START */
        resizeCanvas();   // important: sets correct size first
        animate();
         
            function swipeUp() {
                const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
                const start = Math.max(window.pageYOffset || document.documentElement.scrollTop || 0, 0);
                const end = 0;
                const duration = 0;
                const startTime = performance.now();

                function animate(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const currentY = start + (end - start) * eased;

                    window.scrollTo({ top: currentY, behavior: 'auto' });

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    }
                }

                requestAnimationFrame(animate);
            }

            window.addEventListener('load', function() {
                setTimeout(function() {
                    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

                    if (maxScroll > 0) {
                        window.scrollTo({ top: maxScroll, behavior: 'auto' });
                        setTimeout(function() {
                            swipeUp();
                        }, 0);
                    } else {
                        swipeUp();
                    }
                }, 500);
            });
        