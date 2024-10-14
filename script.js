document.addEventListener('DOMContentLoaded', function () {
    const sections = ['summary', 'education', 'projects', 'skills', 'publications'];
    const colors = ['text-green-400', 'text-blue-400', 'text-yellow-400', 'text-pink-400', 'text-purple-400', 'text-red-400', 'text-indigo-400'];
  
    let input = '';
    let output = [];
    let history = [];
    let historyIndex = -1;
    let currentSection = '';
    const outputElement = document.getElementById('output');
    const cliInput = document.getElementById('cliInput');
  
    function updateOutput() {
      outputElement.innerHTML = output
        .map((line, index) => `<div class="mb-1 ${colors[index % colors.length]}">${line}</div>`)
        .join('');
    }
  
    function processCommand(cmd) {
      const lowerCmd = cmd.toLowerCase().trim();
      output.push(`$ ${cmd}`);
      if (sections.includes(lowerCmd)) {
        displaySection(lowerCmd);
      } else {
        switch (lowerCmd) {
          case 'help':
            displayHelp();
            break;
          case 'clear':
            output = [];
            break;
          case 'contact':
            displayContact();
            break;
          default:
            output.push(`Command not found: ${cmd}. Type "help" for a list of commands.`);
        }
      }
      updateOutput();
    }
  
    function displayHelp() {
      output.push('Available commands:', ...sections, 'contact - Display contact information', 'clear - Clear the terminal', 'help - Display this help message');
    }
  
    function displayContact() {
      output.push('Contact Information:', 'Email: katukamharshith150@gmail.com', 'Phone: +91 9346476740', 'LinkedIn: https://www.linkedin.com/', 'GitHub: https://github.com/Harshith150');
    }
  
    function displaySection(section) {
      const content = getSectionContent(section);
      output.push(...content);
    }
  
    function getSectionContent(section) {
      switch (section) {
        case 'summary':
          return ['Professional Summary:', 'An enthusiastic and hardworking Computer Science student looking for an internship/full-time opportunity.'];
        case 'education':
          return [
            'Education:',
            '- KMIT, Hyderabad: B.Tech CSE (8.9 CGPA)',
            '- Sri Chaitanya Junior Kalasala: Intermediate in MPC (97.6%)',
            '- Manasa High School: SSC (10.0 GPA)',
          ];
        case 'projects':
          return [
            'Projects:',
            '1. GEBV Prediction using ML & DL Techniques',
            '2. Snake-Project (C Language)',
            '3. AI Car Game (JavaScript, HTML, CSS)',
            '4. Top Hit Songs Spotify Playlist (Python)',
          ];
        case 'skills':
          return [
            'Skills:',
            '- Programming: Java, Python, C, C++, HTML5, CSS3, JavaScript',
            '- Tools: Git, GitHub, Linux CLI',
            '- Frameworks: TensorFlow, Flask',
          ];
        case 'publications':
          return [
            'Publications:',
            '- Paper on genomic prediction of Oryza Sativa using ML & DL',
            '- Presented at ICICC-2024',
          ];
        default:
          return ['Invalid section'];
      }
    }
  
    document.getElementById('cliForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const command = cliInput.value;
      if (command) {
        processCommand(command);
        history.push(command);
        historyIndex = -1;
      }
      cliInput.value = '';
    });
  
    cliInput.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (history.length > 0) {
          historyIndex = Math.min(historyIndex + 1, history.length - 1);
          cliInput.value = history[history.length - 1 - historyIndex] || '';
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (history.length > 0) {
          historyIndex = Math.max(historyIndex - 1, -1);
          cliInput.value = historyIndex === -1 ? '' : history[history.length - 1 - historyIndex];
        }
      }
    });
  
    // Initial messages
    output.push("Welcome to Katukam Harshith's CLI Portfolio!", 'Type "help" for a list of commands.');
    updateOutput();
  });
  