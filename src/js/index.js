function setLoading(isLoading) {
    const btnSpan = document.getElementById('generate-btn');

    if (isLoading) {
        btnSpan.innerHTML = 'Gerando Background...';
    } else {
        btnSpan.innerHTML = 'Gerar Background Mágico';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form-group');
    const textArea = document.getElementById('description');
    const htmlCode = document.getElementById('html-code');
    const cssCode = document.getElementById('css-code');
    const preview = document.getElementById('preview-section');
    
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const description = textArea.value.trim();
        if (!description) {
            return;
        } else {
            setLoading(true);
        }

        try {

            const response = await fetch('https://flaviannasaldanha.app.n8n.cloud/webhook/gerador-fundo', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({description})
            });

            const data = await response.json();
            htmlCode.textContent = data.code || "";
            cssCode.textContent = data.style || "";

            preview.style.display = "block";
            preview.innerHTML = data.code || "";

            let styleTag = document.getElementById('dynamic-style');

            if (styleTag) styleTag.remove();

            if (data.style) {
                styleTag = document.createElement('style');
                styleTag.id = 'dynamic-style';

                styleTag.textContent = data.style;
                document.head.appendChild(styleTag);
            }

        } catch (error) {
            console.error('Erro ao gerar o fundo:', error);
            htmlCode.textContent = "Não consegui gerar o código HTML, tente novamente";
            cssCode.textContent = "Não consegui gerar o código CSS, tente novamente";
            preview.innerHTML = "";
        } finally {
            setLoading(false);
        }
    });
});