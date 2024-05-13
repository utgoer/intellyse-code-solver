const Loading = () => {
  return <>
    <style jsx>{`
          .loader {
            border: 5px solid #f3f3f3; 
            border-top: 5px solid #2563eb;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 2s linear infinite;
            margin: auto;
          }
  
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
      `}</style>
    <div className="loader"></div>
  </>
}
export default Loading;