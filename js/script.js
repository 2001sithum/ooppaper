// js/script.js
document.addEventListener('DOMContentLoaded', function() {

    // --- Active Sidebar Link Handler ---
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.sidebar-nav a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('#')[0];
        if (linkPath === currentPath) {
            // This is a rough check to highlight the main question link
            if (link.parentElement.classList.contains('main-question')) {
                // You can add a specific style for the main active question if needed
            }
            // Highlight specific sub-question links
            const subQuestionLinks = link.closest('.main-question').querySelectorAll('.sub-questions a');
            subQuestionLinks.forEach(subLink => {
                if(subLink.href === window.location.href) {
                    subLink.classList.add('active');
                }
            });
        }
    });

    // A more robust way for the active link on page load and hash change
    function highlightActiveLink() {
        const currentHash = window.location.hash;
        document.querySelectorAll('.sidebar-nav .sub-questions a').forEach(el => {
            el.classList.remove('active');
            if(el.hash === currentHash) {
                el.classList.add('active');
            }
        });
    }

    window.addEventListener('hashchange', highlightActiveLink);
    highlightActiveLink(); // Run on initial load


    // --- Copy Button Functionality ---
    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', () => {
            const pre = button.closest('.code-block').querySelector('pre');
            const code = pre.innerText;

            navigator.clipboard.writeText(code).then(() => {
                const originalIcon = button.innerHTML;
                button.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
                button.style.backgroundColor = '#4caf50'; // Green feedback

                setTimeout(() => {
                    button.innerHTML = originalIcon;
                    button.style.backgroundColor = ''; // Revert color
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                button.innerText = 'Error!';
            });
        });
    });

});