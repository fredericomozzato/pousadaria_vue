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
                inn.phone = o.phone;
                inn.email = o.email;
                inn.description = o.description;
                inn.payMethods = o.pay_methods;
                inn.petFriendly = o.pet_friendly;
                inn.userPolicies = o.user_policies;
                inn.checkInTime = o.formatted_check_in_time;
                inn.checkOutTime = o.formatted_check_ou_ttime;
                inn.score = o.average_score;
                inn.street = o.address.street;
                inn.number = o.address.number;
                inn.neighborhood = inn.neighborhood;
                inn.city = o.address.city;
                inn.state = o.address.state;
                inn.postalCode = o.postal_code;

                this.innsList.push(inn);
            });
        },
    },
    beforeMount() {
        this.getInns();
    }
});

app.mount("#app");