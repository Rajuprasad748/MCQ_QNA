const fetchData = async () => {
    try {
      const fetch = await axios.get("/api");
    } catch (error) {
      console.log(error);
    }
  };

fetchData();
