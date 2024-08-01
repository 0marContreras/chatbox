"use client"

const BackupButton = () => {
    const handleDownload = async () => {
      const response = await fetch('/api/backups');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data.json';
      document.body.appendChild(a);
      a.click();
      a.remove();
    };
  
    return (
      <button onClick={handleDownload} className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm">
        Create backup
      </button>
    );
  };
  
  export default BackupButton;