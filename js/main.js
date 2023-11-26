const NavBar = {
    template: "#nav-bar"
}

const InnsList = {
    template: "#inns-list",
    data() {
        return {
            inns: [],
            query: ""
        }
    },
    methods: {
        async getInns() {
            let res = await fetch("http://localhost:3000/api/v1/inns");
            let data = await res.json();

            data.forEach(o => {
                let inn = new Object();

                inn.id = o.id;
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

                this.inns.push(inn);
            });
        },
    },
    beforeMount() {
        this.getInns();
    }
}

const InnDetails = {
    template: "#inn-details-template",
    data() {
        return {
            inn: new Object(),
            rooms: []
        }
    },
    created() {
        this.getInn();
        this.getRooms();
    },
    methods: {
        async getInn() {
            var id = this.$route.params.id;
            var res = await fetch(`http://localhost:3000/api/v1/inns/${id}`);
            var data = await res.json();
        
            this.inn.name = data.name;
            this.inn.email = data.email;
            this.inn.phone = data.phone;
            this.inn.payMethods = data.pay_methods;
            this.inn.petFriendly = data.pet_friendly;
            this.inn.userPolicies = data.user_policies;
            this.inn.checkInTime = data.formatted_check_in_time;
            this.inn.checkOutTime = data.formatted_check_out_time;
            this.inn.city = data.address.city;
            this.inn.state = data.address.state;
            this.inn.street = data.address.street;
            this.inn.number = data.address.number;
            this.inn.neighborhood = data.address.neighborhood;
            this.inn.postalCode = data.address.postal_code;
            this.inn.description = data.description;
            this.inn.averageScore = data.average_score;
        },
        async getRooms() {
            var innId = this.$route.params.id;
            var url = `http://localhost:3000/api/v1/inns/${innId}/rooms`;
            var res = await fetch(url);
            var data = await res.json();

            this.rooms = [];

            data.forEach(r => {
                var room = new Object();

                room.name = r.name;
                room.description = r.description;
                room.size = r.size;
                room.maxGuests = r.max_guests;
                room.price = r.price;
                room.bathroom = r.bathroom;
                room.porch = r.porch;
                room.airConditioner = r.air_conditioner;
                room.tv = r.tv;
                room.wardrober = r.wardrobe;
                room.safe = r.safe;
                room.wifi = r.wifi;
                room.accessibility = r.accessibility;

                this.rooms.push(room);
            });
        }
    }

}

const Main = {
    template: "#main-template",
    components: {
        "nav-bar": NavBar,
        InnsList: InnsList,
        InnDetails: InnDetails
    }
}

const routes = [
    { path: "/", component: InnsList },
    { path: "/inns/:id", component: InnDetails }
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
  })

const app = Vue.createApp(Main)

app.use(router);
app.mount("#app");