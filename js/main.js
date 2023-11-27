const NavBar = {
    template: "#nav-bar-template",
    method: {
        async searchInn() {
            var url = `http://localhost:3000/api/v1/inns?name=${query}`;
            var res = await fetch(url);
            var jsonData = await res.json();

            
        }
    }
}

const InnsList = {
    template: "#inns-list-template",
    data() {
        return {
            query: "",
            inns: [],
            recentInns: []
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

                console.log(inn.score);

                this.inns.push(inn);
            });

            this.inns.sort((a, b) => a.name.localeCompare(b.name));
        }
    },
    beforeMount() {
        this.getInns();
    },
    computed: {
        filterInns() {
            return this.inns.filter(inn => {
                return inn.name.toLowerCase().includes(this.query.toLowerCase())
            });
        }
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
        
            this.inn.id = data.id;
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
            this.inn.score = data.average_score;
        },
        async getRooms() {
            var innId = this.$route.params.id;
            var url = `http://localhost:3000/api/v1/inns/${innId}/rooms`;
            var res = await fetch(url);
            var data = await res.json();

            this.rooms = [];

            data.forEach(r => {
                var room = new Object();

                room.id = r.id;
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

const Booking = {
    template: "#booking-template",
    data() {
        return {
            innId: this.$route.params.id,
            roomId: this.$route.params.roomId,
            startDate: new Date(),
            endDate: new Date(),
            guests: 0,
            available: null,
            value: null,
            errors: []
        }
    },
    methods: {
        async checkAvailability() {
            let baseUrl = `http://localhost:3000/api/v1/bookings/pre-booking`;
            let params = `?room_id=${this.roomId}&start_date=${this.startDate}
                          &end_date=${this.endDate}&number_of_guests=${this.guests}`;
            let res = await fetch(baseUrl + params);
            let data = await res.json();

            if (res.status === 200) {
                this.value = data.valor;
                this.available = true;
            } else {
                this.available = false;
                this.errors = data.erro;
            }
        }
    }
}

const Main = {
    template: "#main-template",
    components: {
        "nav-bar": NavBar,
        InnsList: InnsList,
        InnDetails: InnDetails,
        Booking: Booking
    }
}

const routes = [
    { path: "/", component: InnsList },
    { path: "/inns/:id", component: InnDetails },
    { path: "/inns/:id/room/:roomId/booking", component: Booking }
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
  })

const app = Vue.createApp(Main)

app.use(router);
app.mount("#app");