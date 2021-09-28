function worker() {
  this.addEventListener("message", (e) => {
    if (!e) return;
    console.log("task assigned to worker");
    const users = [];

    const userDetails = {
      name: "Jane Doe",
      email: "jane.doe@gmail.com",
      id: 1,
    };

    for (let i = 0; i < 50000000; i++) {
      userDetails.id = i++;
      userDetails.dateJoined = Date.now();

      users.push(userDetails);
    }
    console.log("worker completed task");
    postMessage(users);
  });
}

export default worker;
