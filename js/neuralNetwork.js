//run NeuralNetwork
function a() {


    var Neuron = synaptic.Neuron,
        Layer = synaptic.Layer,
        Network = synaptic.Network,
        Trainer = synaptic.Trainer,
        Architect = synaptic.Architect;

    function Perceptron(input, hidden, output) {
        // create the layers
        var inputLayer = new Layer(input);
        var hiddenLayer = new Layer(hidden);
        var outputLayer = new Layer(output);

        // connect the layers
        inputLayer.project(hiddenLayer);
        hiddenLayer.project(outputLayer);

        // set the layers
        this.set({
            input: inputLayer,
            hidden: [hiddenLayer],
            output: outputLayer
        });
    }
        //create the Network
    Perceptron.prototype = new Network();
    Perceptron.prototype.constructor = Perceptron;
    var myPerceptron = new Perceptron(1024, 70, 1);
    var myTrainer = new Trainer(myPerceptron);
    var trainingSet = [
        {
            input: lightMass,
            output: [1]
        },
        {
            input: light2Mass,
            output: [1]
        },
        {
            input: hardMass,
            output: [0]
        },
        /*{
           input: hard2Mass,
            output: [0]
        },*/
        {
            input: dubstepMass,
            output: [0]
        },
        {
            input: dubstep2Mass,
            output: [0]
        },
        {
            input: jazzMass,
            output: [1]
        }
    ]

    myTrainer.train(trainingSet, {
        iterations: 3000,
        error: .005,
        log: 1000,
    });
    //check the NeuralNetwork
    console.log(myPerceptron.activate(hard2Mass));


}