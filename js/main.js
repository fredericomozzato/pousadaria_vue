const app = Vue.createApp({
    data() {
        return {
            innsList: []
        }
    },
    methods: {
        async getInns() {
            let res = await fetch("http://localhost:3000/api/v1/inns");
            let data = await res.json();

            console.log(data);

            data.forEach(o => {
                let inn = new Object();

                inn.name = o.name;
                inn.city = o.address.city;
                inn.state = o.address.state;
                inn.description = o.description;
                inn.score = o.average_score

                this.innsList.push(inn);
            });
        }
    },
    beforeMount() {
        this.getInns();
    }
});

app.mount("#app");